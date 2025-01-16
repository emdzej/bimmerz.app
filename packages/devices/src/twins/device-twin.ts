import { EventEmitter } from "@bimmerz/core";
import { DEVICE, KNOWN_DEVICES, IBusInterface, COMMAND_INDEX, IBusMessage, IBusMessageHandler} from "@bimmerz/bus";
import { Logger } from '@bimmerz/core';
import { DeviceEvents } from "../devices";
import { BuilderArgumentParserRegistry, BuilderRegistry, buildStatusResponse, BuiltTypes, COMMAND, KNOWN_COMMANDS, MODULE_STATUSES } from "@bimmerz/commands";

export type DeviceTwinStatus = {
    lastActivity?: Date;
    isPresent: boolean;
    isActive: boolean;
}

export type BaseDeviceActions = {
    requestStatus: {};
    announce: {};
    reportPresence: {};
    reportStatus: {};
}

export abstract class DeviceTwin<
    TEvents extends DeviceEvents = DeviceEvents,
    TActions extends BuiltTypes = BaseDeviceActions,
    TStatus extends DeviceTwinStatus = DeviceTwinStatus
    > extends EventEmitter<TEvents> {
    
    public readonly deviceAddress: DEVICE;
    public readonly deviceName: string = 'Unknown Device';
    private _status: DeviceTwinStatus;

    public get status(): TStatus {
        return this._status as TStatus;
    } 

    protected readonly ibusInterface: IBusInterface;
    protected readonly log: Logger;
    private readonly _handlers: Record<number, IBusMessageHandler>;
    protected activityTImer?: NodeJS.Timeout;
    
    protected constructor(deviceAddress: DEVICE, deviceName: string, ibusInterface: IBusInterface, log: Logger) {
        super();        
        this._status = { isPresent: false, isActive: false };
        this.deviceAddress = deviceAddress;
        this.deviceName = deviceName;
        this.ibusInterface = ibusInterface;
        this.log = log;
        this._handlers = {
            [KNOWN_COMMANDS.REQUEST_IDENTITY]: (message) => this.handleIdentityRequest(message),
            [KNOWN_COMMANDS.MODULE_STATUS_REQUEST]: (message) => this.handleModuleStatusRequest(message),
            [KNOWN_COMMANDS.MODULE_STATUS_RESPONSE]: (message) => this.handleModuleStatusResponse(message)
        };
        this.ibusInterface.on('message', this.routeMessage, this);        
    }

    protected get baseDeviceActionBuilders(): BuilderRegistry<BaseDeviceActions> {
        return {
            requestStatus: () => buildStatusResponse({ 
                source: this.deviceAddress, 
                target: KNOWN_DEVICES.GLO,
                status: MODULE_STATUSES.MODULE_PRESENT
            }),
            announce: () => buildStatusResponse({ 
                source: this.deviceAddress, 
                target: KNOWN_DEVICES.GLO,
                status: MODULE_STATUSES.MODULE_PRESENT
            }),
            reportPresence: () => buildStatusResponse({ 
                source: this.deviceAddress, 
                target: KNOWN_DEVICES.GLO,
                status: MODULE_STATUSES.MODULE_PRESENT
            }),
            reportStatus: () => buildStatusResponse({ 
                source: this.deviceAddress, 
                target: KNOWN_DEVICES.GLO,
                status: MODULE_STATUSES.MODULE_PRESENT
            })
        };
    }

    protected get baseDeviceActionArgsParsers(): BuilderArgumentParserRegistry<BaseDeviceActions> {
        return {
            requestStatus: () => ({}),
            announce: () => ({}),
            reportPresence: () => ({}),
            reportStatus: () => ({})
        };
    }

    public abstract get actions(): {[K in keyof TActions]: string };

    protected abstract get actionBuilders(): BuilderRegistry<TActions>;

    protected abstract get actionArgsParsers(): BuilderArgumentParserRegistry<TActions>;

    public do(action: string, args: any[]): void {
        const deviceAction = action.toString();
        if (!this.actionBuilders.hasOwnProperty(deviceAction) || !this.actionArgsParsers.hasOwnProperty(deviceAction)) {
            this.log.warn(`Action ${deviceAction} not implemented`);
            return;
        }
        try {            
            const builder = this.actionBuilders[deviceAction];
            const parser = this.actionArgsParsers[deviceAction];
            const command = builder(parser(...args));        
            this.ibusInterface.sendMessage(command);
        } catch (e) {
            this.log.error(e, `Error executing action ${deviceAction}`);
        }
    }
    
    protected abstract handleIdentityRequest(message: IBusMessage): void;

    protected abstract handleModuleStatusResponse(message: IBusMessage): void;

    protected defaultStatusResponseHandler(): void {
        this.status.isPresent = true;        
    }

    protected abstract handleModuleStatusRequest(message: IBusMessage): void;

    protected defaultModuleStatusRequestHandler(message: IBusMessage): void {
        if (this.status.isActive) {
            this.ibusInterface.sendMessage(buildStatusResponse({ 
                source: this.deviceAddress, 
                target: message.source,
                status: MODULE_STATUSES.MODULE_PRESENT
            }));
        }        
    }
     
    protected handle(command: number, withHandler: IBusMessageHandler): void {
        this._handlers[command] = withHandler;        
    }

    public activate(): void {
        this._status.isActive = true;
        this.ibusInterface.sendMessage(buildStatusResponse({ 
            source: this.deviceAddress, 
            target: KNOWN_DEVICES.GLO,
            status: MODULE_STATUSES.MODULE_ANNOUNCE
        }));
        this.activityTImer = setTimeout(() => {
            this.ibusInterface.sendMessage(buildStatusResponse({ 
                source: this.deviceAddress, 
                target: KNOWN_DEVICES.GLO,
                status: MODULE_STATUSES.MODULE_PRESENT
            }));
        }, 5000);
    }

    public deactivate(): void {
        this._status.isActive = false;
        if (this.activityTImer) {
            clearTimeout(this.activityTImer);
        }
    }

    private routeMessage(owner: any, message: IBusMessage) {
        const me = owner as this;
        if (message.destination === KNOWN_DEVICES.LOC || message.source === KNOWN_DEVICES.GLO) {
            me.log.debug(message, "Broadcast message, accepting");
            me.handleMessage(message);
        }
        else if  (me.deviceAddress === message.destination) {
            me.log.debug(message, "Message for me, accepting");
            me.handleMessage(message);
        } else if (me.deviceAddress === message.source) {
            me._status.lastActivity = new Date();
            me._status.isPresent = true;
            me.log.debug(message, "Message from me, accepting");
            me.handleMessage(message);
        }
    }

    private handleMessage(message: IBusMessage): void {
        const command = message.payload[COMMAND_INDEX] as COMMAND;
        if (this._handlers[command]) {
            this.log.debug(message, "Handling message");
            try {
                this._handlers[command](message);
            } catch (e) {
                this.log.error(e, "Error handling message");
            }
        } else {
            this.log.debug(message, "No handler for message");
        }
    }
}