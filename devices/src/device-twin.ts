import { EventEmitter } from "@bimmerz/core";
import { DEVICE, KNOWN_DEVICES, IBusInterface, COMMAND_INDEX, IBusMessage, IBusMessageHandler} from "@bimmerz/ibus";
import { Logger } from '@bimmerz/core';
import { DeviceEvents, MODULE_STATUS, MODULE_STATUSES } from "./types";
import { COMMANDS as COMMON_COMMANDS } from "./types";

export abstract class DeviceTwin<TEvents extends DeviceEvents> extends EventEmitter<TEvents> {
    protected lastActivity?: number;
    public readonly deviceAddress: DEVICE;
    public readonly deviceName: string = 'Unknown Device';
    protected isPresent: boolean = false;
    protected readonly ibusInterface: IBusInterface;
    protected readonly log: Logger;
    private readonly _handlers: Record<number, IBusMessageHandler>;
        
    protected constructor(deviceAddress: DEVICE, deviceName: string, ibusInterface: IBusInterface, log: Logger) {
        super();
        this.deviceAddress = deviceAddress;
        this.deviceName = deviceName;
        this.ibusInterface = ibusInterface;
        this.log = log;
        this._handlers = {
            [COMMON_COMMANDS.MODULE_STATUS_REQUEST]: (message) => this.handleModuleStatusRequest(message),
            [COMMON_COMMANDS.MODULE_STATUS_RESPONE]: (message) => this.handleModuleStatusResponse(message)
        };
        this.ibusInterface.on('message', this.routeMessage, this);
    }
    
    protected abstract handleModuleStatusResponse(message: IBusMessage): void;
    protected abstract handleModuleStatusRequest(message: IBusMessage): void;
     
    protected handle(command: number, withHandler: IBusMessageHandler): void {
        this._handlers[command] = withHandler;
    }

    private routeMessage(owner: any, message: IBusMessage) {
        const me = owner as this;
        if (message.destination === KNOWN_DEVICES.BROADCAST || message.source === KNOWN_DEVICES.GLOBAL_BROADCAST) {
            me.log.debug(message, "Broadcast message, accepting");
            me.handleMessage(message);
        }
        else if  (me.deviceAddress === message.destination) {
            me.log.debug(message, "Message for me, accepting");
            me.handleMessage(message);
        } else if (me.deviceAddress === message.source) {
            me.log.debug(message, "Message from me, accepting");
            me.handleMessage(message);
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