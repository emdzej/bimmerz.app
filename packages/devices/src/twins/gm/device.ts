import { DEVICE, KNOWN_DEVICES, IBusMessage, IBusInterface, KNOWN_DEVICE_NAMES } from "@bimmerz/bus";
import { BaseDeviceActions, DeviceTwin } from "../device-twin";
import { Logger } from '@bimmerz/core';
import { BodyModuleEvents, DoorLidStatusRequestEvent, DoorLidStatusesChangedEvent, InteriorLightStatusChangedEvent, CentralLockingStatusChangedEvent } from "./events";
import { buildBodyModuleDoorLidStatusRequest, BuilderArgumentParserRegistry, BuilderRegistry, CENTRAL_LOCKING_STATUS, CENTRAL_LOCKING_STATUSES, DOOR_LID_STATUSES, DoorLidStatuses, GM_COMMAND_BUILDERS, KNOWN_COMMANDS, LAMP_STATUS, LAMP_STATUSES, parseBodyModuleDiagnosticResponse, parseBodyModuleDoorLidStatusResponse, WINDOW_STATUSES, WindowStatuses, WindowStatusesChangedEvent } from "@bimmerz/commands";

type GMActions = BaseDeviceActions & {
    
}

export class GM extends DeviceTwin<BodyModuleEvents, GMActions> {
    public get actions(): { requestStatus: string; announce: string; reportPresence: string; reportStatus: string; } {
        return {
            requestStatus: 'requestStatus',
            announce: 'announce',
            reportPresence: 'reportPresence',
            reportStatus: 'reportStatus',
        };
    }
    protected get actionBuilders(): BuilderRegistry<BaseDeviceActions> {
        return {
            ...this.baseDeviceActionBuilders,
            ...GM_COMMAND_BUILDERS
        };
    }
    protected get actionArgsParsers(): BuilderArgumentParserRegistry<BaseDeviceActions> {
        return {
            ...this.baseDeviceActionArgsParsers,
        };
    }
    
    private _doorLidStatuses: DoorLidStatuses = {
        driverFront: DOOR_LID_STATUSES.CLOSED,
        passengerFront: DOOR_LID_STATUSES.CLOSED,
        driverRear: DOOR_LID_STATUSES.CLOSED,
        passengerRear: DOOR_LID_STATUSES.CLOSED,
        frontLid: DOOR_LID_STATUSES.CLOSED,
        rearLid: DOOR_LID_STATUSES.CLOSED,
        bootRelease: DOOR_LID_STATUSES.CLOSED,
        sunroof: DOOR_LID_STATUSES.CLOSED,
    };

    public get doorLidStatuses(): Readonly<DoorLidStatuses> {
        return this._doorLidStatuses;
    }

    private _centralLockingStatus: CENTRAL_LOCKING_STATUS = CENTRAL_LOCKING_STATUSES.UNLOCKED;

    public get centralLockingStatus(): CENTRAL_LOCKING_STATUS {
        return this._centralLockingStatus;
    }

    private _interiorLightStatus: LAMP_STATUS = LAMP_STATUSES.OFF;

    public get interiorLightStatus(): LAMP_STATUS {
        return this._interiorLightStatus;
    }

    private _windowStatuses: WindowStatuses = {
        driverFront: WINDOW_STATUSES.CLOSED,
        passengerFront: WINDOW_STATUSES.CLOSED,
        driverRear: WINDOW_STATUSES.CLOSED,
        passengerRear: WINDOW_STATUSES.CLOSED,
    };

    public get windowStatuses(): Readonly<WindowStatuses> {
        return this._windowStatuses;
    }

    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.GM, KNOWN_DEVICE_NAMES.GM, ibusInterface, logger);
        this.handle(KNOWN_COMMANDS.DD, (message) => this.handleDiagnosticResponse(message));
        this.handle(KNOWN_COMMANDS.DOOR_LID_STATUS_RESPONSE, (message) => this.handleDoorLidStatusResponse(message));
        this.handle(KNOWN_COMMANDS.DOOR_LID_STATUS_REQUEST, (message) => this.handleDoorLidStatusRequest(message));
    }

    public requestDoorLidStatus(source: DEVICE): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleDoorLidStatusRequest(source)
        );
    }

    private handleDoorLidStatusRequest(message: IBusMessage): void {
        this.emit("doorLidStatusRequest", { source: message.source, destination: message.destination } as DoorLidStatusRequestEvent);
    }

    private handleDoorLidStatusResponse(message: IBusMessage): void {
        const { doorLidStatuses, centralLockingStatus, interiorLightStatus, windowStatuses } = parseBodyModuleDoorLidStatusResponse(message);
       

        this._doorLidStatuses = doorLidStatuses;        
        this._centralLockingStatus = centralLockingStatus;
        this._interiorLightStatus = interiorLightStatus;
        this._windowStatuses = windowStatuses;

        this.log.debug(doorLidStatuses, 'Door lid statuses');
        this.log.debug(centralLockingStatus, 'Central locking status');
        this.log.debug(interiorLightStatus, 'Interior light status');
        this.log.debug(windowStatuses, 'Window statuses');

        this.emit("windowStatusesChange", { statuses: windowStatuses } as WindowStatusesChangedEvent);
        this.emit("doorLidStatusesChange", { doorLidStatuses } as DoorLidStatusesChangedEvent);
        this.emit("interiorLightStatusChange", { status: interiorLightStatus } as InteriorLightStatusChangedEvent);
        this.emit("centralLockingStatusChange", { status: centralLockingStatus } as CentralLockingStatusChangedEvent);
    }

    private handleDiagnosticResponse(message: IBusMessage): void {
        const variant = parseBodyModuleDiagnosticResponse(message);        
        this.log.info('Body Module variant:', variant);
    };

    protected handleIdentityRequest(message: IBusMessage): void {
        this.emit('identityRequest', { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.defaultModuleStatusRequestHandler(message);
        this.emit('statusResponse', { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.defaultStatusResponseHandler();
        this.emit('statusRequest', { source: message.source, destination: message.destination });
    }
}

