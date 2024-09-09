import { EventEmitter } from "@bimmerz/core";
import { DEVICE, KNOWN_DEVICES, IBusInterface, COMMAND_INDEX, IBusMessage, IBusMessageHandler} from "@bimmerz/bus";
import { Logger } from '@bimmerz/core';
import { DeviceEvents, DeviceOperations, DeviceOperationsCategory, DeviceOperationsRegistry } from "../devices";
import { buildStatusRequest, buildStatusResponse, KNOWN_COMMANDS, MODULE_STATUSES } from "@bimmerz/commands";

export abstract class DeviceTwin<
    TEvents extends DeviceEvents
    > extends EventEmitter<TEvents> {
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
            [KNOWN_COMMANDS.MODULE_STATUS_REQUEST]: (message) => this.handleModuleStatusRequest(message),
            [KNOWN_COMMANDS.MODULE_STATUS_RESPONSE]: (message) => this.handleModuleStatusResponse(message)
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
}