import { EventEmitter } from "stream";
import { DEVICE, KNOWN_DEVICES } from "../devices";
import { IBusMessage, IBusMessageHandler } from "../types";
import { IBusInterface } from "../interface";
import { Logger, LoggerOptions } from 'pino';
import { MODULE_STATUS, MODULE_STATUSES } from "./commands";
import { COMMANDS as COMMON_COMMANDS } from "./commands";
import { COMMAND_INDEX } from "../protocol";
import { MODULE_STATUS_REQUEST_EVENT, MODULE_STATUS_RESPONSE_EVENT } from "./types";

export abstract class DeviceTwin extends EventEmitter {
    protected lastActivity?: number;
    public readonly deviceAddress: DEVICE;
    public readonly deviceName: string = 'Unknown Device';
    protected isPresent: boolean = false;
    protected ibusInterface: IBusInterface;
    protected log: Logger<LoggerOptions>;
    private handlers: Record<number, IBusMessageHandler>;
    
    protected constructor(deviceAddress: DEVICE, deviceName: string, ibusInterface: IBusInterface, log: Logger<LoggerOptions>) {
        super();
        this.deviceAddress = deviceAddress;
        this.deviceName = deviceName;
        this.ibusInterface = ibusInterface;
        this.log = log;
        this.handlers = {
            [COMMON_COMMANDS.MODULE_STATUS_REQUEST]: (message) => this.handleModuleStatusRequest(message),
            [COMMON_COMMANDS.MODULE_STATUS_RESPONE]: (message) => this.handleModuleStatusResponse(message)
        };
        this.ibusInterface.on('message', (message: IBusMessage) => this.routeMessage(message));
    }
    
    private handleModuleStatusResponse(message: IBusMessage): void {
        this.emit(MODULE_STATUS_RESPONSE_EVENT, {
            source: message.source,
            destination: message.destination,
        });
    }

    protected registerHandler(command: number, handler: IBusMessageHandler): void {
        this.handlers[command] = handler;
    }

    private handleModuleStatusRequest(message: IBusMessage): void {
        this.emit(MODULE_STATUS_REQUEST_EVENT, {
            source: message.source,
            destination: message.destination
        });
    }

    private routeMessage(message: IBusMessage) {
        if (message.destination === KNOWN_DEVICES.Broadcast) {
            this.log.debug(message, "Broadcast message, accepting");
            this.handleMessage(message);
        }
        else if  (this.deviceAddress === message.destination) {
            this.log.debug(message, "Message for me, accepting");
            this.handleMessage(message);
        } else if (this.deviceAddress === message.source) {
            this.log.debug(message, "Message from me, accepting");
            this.handleMessage(message);
        }
    }

    private handleMessage(message: IBusMessage): void {
        this.log.debug(message, "Handling message");

        const command = message.payload[COMMAND_INDEX];
        if (this.handlers[command]) {
            this.handlers[command](message);
        }
    }

    public requestStatus(targetDevice: DEVICE, sourceDevice: DEVICE = this.deviceAddress): void {
        const payload = Buffer.alloc(1);
        payload[0] = COMMON_COMMANDS.MODULE_STATUS_REQUEST;
        const message = {
            source: sourceDevice,
            destination: targetDevice,
            payload
        };
        this.ibusInterface.sendMessage(message);
    }

    public announceStatus(targetDevice: DEVICE = KNOWN_DEVICES.Broadcast): void {
        const payload = Buffer.alloc(2);
        payload[0] = COMMON_COMMANDS.MODULE_STATUS_RESPONE;
        payload[1] = MODULE_STATUSES.MODULE_PRESENT;
        this.announceStatusRaw(payload, targetDevice);        
    }

    public announceStatusRaw(status: Buffer, targetDevice: DEVICE = KNOWN_DEVICES.Broadcast): void {
        this.log.debug({ status }, "Announcing status");
        const payload = Buffer.alloc(status.length + 1);
        payload[0] = COMMON_COMMANDS.MODULE_STATUS_RESPONE;
        status.copy(payload, 1);
        this.ibusInterface.sendMessage({
            source: this.deviceAddress,
            destination: targetDevice,
            payload
        });
    }
}