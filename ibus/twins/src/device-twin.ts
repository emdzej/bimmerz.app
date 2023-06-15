import EventEmitter from "events";
import { DEVICE, KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { IBusMessage, IBusMessageHandler } from "@bimmerz/ibus-core";
import { IBusInterface } from "@bimmerz/ibus-core";
import { Logger, LoggerOptions } from 'pino';
import { MODULE_STATUS, MODULE_STATUSES } from "./types";
import { COMMANDS as COMMON_COMMANDS } from "./types";
import { COMMAND_INDEX } from "@bimmerz/ibus-core";
import { MODULE_STATUS_REQUEST_EVENT, MODULE_STATUS_RESPONSE_EVENT } from "./types";
import { Vehicle } from "vehicle";

export abstract class DeviceTwin extends EventEmitter {
    protected lastActivity?: number;
    public readonly deviceAddress: DEVICE;
    public readonly deviceName: string = 'Unknown Device';
    protected isPresent: boolean = false;
    protected readonly ibusInterface: IBusInterface;
    protected readonly log: Logger<LoggerOptions>;
    private readonly _handlers: Record<number, IBusMessageHandler>;
    protected vehicle?: Vehicle;
    
    protected constructor(deviceAddress: DEVICE, deviceName: string, ibusInterface: IBusInterface, log: Logger<LoggerOptions>) {
        super();
        this.deviceAddress = deviceAddress;
        this.deviceName = deviceName;
        this.ibusInterface = ibusInterface;
        this.log = log;
        this._handlers = {
            [COMMON_COMMANDS.MODULE_STATUS_REQUEST]: (message) => this.handleModuleStatusRequest(message),
            [COMMON_COMMANDS.MODULE_STATUS_RESPONE]: (message) => this.handleModuleStatusResponse(message)
        };
        this.ibusInterface.on('message', (message: IBusMessage) => this.routeMessage(message));
    }
    
    private handleModuleStatusResponse(message: IBusMessage): void {
        this.isPresent = true;
        this.emit(MODULE_STATUS_RESPONSE_EVENT, {
            source: message.source,
            destination: message.destination,
        });
    }

    protected handle(command: number, withHandler: IBusMessageHandler): void {
        this._handlers[command] = withHandler;
    }

    private handleModuleStatusRequest(message: IBusMessage): void {
        this.emit(MODULE_STATUS_REQUEST_EVENT, {
            source: message.source,
            destination: message.destination
        });
    }

    private routeMessage(message: IBusMessage) {
        if (message.destination === KNOWN_DEVICES.BROADCAST || message.source === KNOWN_DEVICES.GLOBAL_BROADCAST) {
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
        const command = message.payload[COMMAND_INDEX];
        if (this._handlers[command]) {
            this.log.debug(message, "Handling message");
            this._handlers[command](message);
        } else {
            this.log.debug(message, "No handler for message");
        }
    }

    public requestStatus(targetDevice: DEVICE, sourceDevice: DEVICE = this.deviceAddress): void {
        const payload = Buffer.from([
            COMMON_COMMANDS.MODULE_STATUS_REQUEST
        ]);        
        const message = {
            source: sourceDevice,
            destination: targetDevice,
            payload
        };
        this.ibusInterface.sendMessage(message);
    }

    public respondToStatusRequest(targetDevice: DEVICE): void {
        const payload = Buffer.from([
            COMMON_COMMANDS.MODULE_STATUS_RESPONE,
            MODULE_STATUSES.MODULE_PRESENT
        ]);
        this.sensStatusReponse(payload, targetDevice);    
    };

    public announce(targetDevice: DEVICE = KNOWN_DEVICES.BROADCAST): void {
        const payload = Buffer.from([
            COMMON_COMMANDS.MODULE_STATUS_RESPONE,
            MODULE_STATUSES.MODULE_ANNOUNCE
        ]);
        this.sensStatusReponse(payload, targetDevice);        
    }

    public sensStatusReponse(status: Buffer, targetDevice: DEVICE = KNOWN_DEVICES.BROADCAST): void {
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