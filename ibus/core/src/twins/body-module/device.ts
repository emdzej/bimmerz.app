import { DEVICE, KNOWN_DEVICES } from "../../devices";
import { DeviceTwin } from "../device-twin";
import { IBusMessage } from "../../types";
import logger, {  } from 'pino';
import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX } from "../../protocol";
import { IBusInterface } from "../../interface";
import { VEHICLE_TYPE, VEHICLE_TYPES } from "../instrument-cluster";
import { DeviceEvent, DeviceEventHandler, DeviceEvents } from "twins/types";
import { BodyModuleEvents, DoorLidStatusRequestEvent, DoorLidStatusesChangedEvent, InteriorLightStatusChangedEvent, CentralLockingStatusChangedEvent } from "./events";
import { DoorLidStatuses, BODY_MODULE_COMMANDS, BODY_MODULE_VARIANT_INDEX, DIAGNOSTIC_JOBS, DOOR_LID_STATUSES, CENTRAL_LOCKING_STATUS, CENTRAL_LOCKING_STATUSES, LAMP_STATUS, LAMP_STATUSES, WindowStatuses, WINDOW_STATUSES, WindowStatusesChangedEvent, SIDE_MIRROR, WINDOW, DIAGNOSTIC_JOB, WINDOWS, WINDOW_STATUS, DOOR_LID_STATUS } from "./types";

export declare interface BodyModule  {    
    on<K extends keyof BodyModuleEvents>(name: K, listener: DeviceEventHandler<BodyModuleEvents[K]>): this;
    emit<K extends keyof BodyModuleEvents>(name: K, event: BodyModuleEvents[K]): boolean;    
}

export class BodyModule extends DeviceTwin {
    private doorLidStatuses: DoorLidStatuses = {
        driverFront: DOOR_LID_STATUSES.CLOSED,
        passengerFront: DOOR_LID_STATUSES.CLOSED,
        driverRear: DOOR_LID_STATUSES.CLOSED,
        passengerRear: DOOR_LID_STATUSES.CLOSED,
        frontLid: DOOR_LID_STATUSES.CLOSED,
        rearLid: DOOR_LID_STATUSES.CLOSED,
        bootRelease: DOOR_LID_STATUSES.CLOSED,
        sunroof: DOOR_LID_STATUSES.CLOSED,
    };
    private centralLockingStatus: CENTRAL_LOCKING_STATUS = CENTRAL_LOCKING_STATUSES.UNLOCKED;
    private interiorLightStatus: LAMP_STATUS = LAMP_STATUSES.OFF;
    private windowStatuses: WindowStatuses = {
        driverFront: WINDOW_STATUSES.CLOSED,
        passengerFront: WINDOW_STATUSES.CLOSED,
        driverRear: WINDOW_STATUSES.CLOSED,
        passengerRear: WINDOW_STATUSES.CLOSED,
    };

    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.BodyModule, 'Body Module', ibusInterface, logger({ name: 'BodyModule', level: 'debug' }));
        this.registerHandler(BODY_MODULE_COMMANDS.DIAGNOSTIC_RESPONSE, (message) => this.handleDiagnosticResponse(message));
        this.registerHandler(BODY_MODULE_COMMANDS.DOOR_LID_STATUS_RESPONSE, (message) => this.handleDoorLidStatusResponse(message));
        this.registerHandler(BODY_MODULE_COMMANDS.DOOR_LID_STATUS_REQUEST, (message) => this.handleDoorLidStatusRequest(message));
    }

    public requestDoorLidStatus(source: DEVICE): void {
        const payload = Buffer.alloc(1);
        payload[0] = BODY_MODULE_COMMANDS.DOOR_LID_STATUS_REQUEST;
        const message: IBusMessage = {
            source,
            destination: this.deviceAddress,
            payload
        }
        this.ibusInterface.sendMessage(message);
    }

    private handleDoorLidStatusRequest(message: IBusMessage): void {
        this.emit("doorLidStatusRequest", { source: message.source, destination: message.destination } as DoorLidStatusRequestEvent);
    }

    private handleDoorLidStatusResponse(message: IBusMessage): void {
        const doorsStatus = message.payload[DATA_BYTE_1_INDEX] & 0b0000_1111;
        const centralLockStatus = (message.payload[DATA_BYTE_1_INDEX] & 0b0011_0000) >> 4;
        const lampIndicator = (message.payload[DATA_BYTE_1_INDEX] & 0b0100_0000) >> 6;
        const windowsStatus = message.payload[DATA_BYTE_2_INDEX] & 0b0000_1111;
        const sunroofStatus = (message.payload[DATA_BYTE_2_INDEX] & 0b0001_0000) >> 4;
        const rearLidStatus = (message.payload[DATA_BYTE_2_INDEX] & 0b0010_0000) >> 5;
        const frontLidStatus = (message.payload[DATA_BYTE_2_INDEX] & 0b0100_0000) >> 6;
        const bootReleaseStatus = (message.payload[DATA_BYTE_2_INDEX] & 0b1000_0000) >> 7;

        const doorLidStatuses: DoorLidStatuses = {
            driverFront: (doorsStatus & 0b0000_0001) as DOOR_LID_STATUS,
            passengerFront: ((doorsStatus & 0b0000_0010) >> 1) as DOOR_LID_STATUS,
            driverRear: ((doorsStatus & 0b0000_0100) >> 2) as DOOR_LID_STATUS,
            passengerRear: ((doorsStatus & 0b0000_1000) >> 3) as DOOR_LID_STATUS,
            sunroof: sunroofStatus as DOOR_LID_STATUS,
            rearLid: rearLidStatus as DOOR_LID_STATUS,
            frontLid: frontLidStatus as DOOR_LID_STATUS,
            bootRelease: bootReleaseStatus as DOOR_LID_STATUS,
        };

        const windowStatuses: WindowStatuses = {
            driverFront: (windowsStatus & 0b0000_0001) as WINDOW_STATUS,
            passengerFront: ((windowsStatus & 0b0000_0010) >> 1) as WINDOW_STATUS,
            driverRear: ((windowsStatus & 0b0000_0100) >> 2) as WINDOW_STATUS,
            passengerRear: ((windowsStatus & 0b0000_1000) >> 3) as WINDOW_STATUS,
        };

        this.doorLidStatuses = doorLidStatuses;        
        this.centralLockingStatus = centralLockStatus as CENTRAL_LOCKING_STATUS;
        this.interiorLightStatus = lampIndicator as LAMP_STATUS;        
        this.windowStatuses = windowStatuses;

        this.log.debug(doorLidStatuses, 'Door lid statuses');
        this.log.debug(centralLockStatus, 'Central locking status');
        this.log.debug(lampIndicator, 'Interior light status');
        this.log.debug(windowStatuses, 'Window statuses');

        this.emit("windowStatusesChange", { statuses: windowStatuses } as WindowStatusesChangedEvent);
        this.emit("doorLidStatusesChange", { doorLidStatuses } as DoorLidStatusesChangedEvent);
        this.emit("interiorLightStatusChange", { status: lampIndicator } as InteriorLightStatusChangedEvent);
        this.emit("centralLockingStatusChange", { status: centralLockStatus } as CentralLockingStatusChangedEvent);
    }

    private handleDiagnosticResponse(message: IBusMessage): void {
        const variant = message.payload[BODY_MODULE_VARIANT_INDEX];
        this.log.info('Body Module variant:', variant);
    };

    private sendDiagnosticMessage(payload: Buffer): void {
        const message: IBusMessage = {
            source: KNOWN_DEVICES.Diagnostic,
            destination: this.deviceAddress,
            payload
        }
        this.ibusInterface.sendMessage(message);
    }

    public pressCenterLockButton(vehicleType: VEHICLE_TYPE): void {
        var payload: Buffer;
        if (vehicleType === VEHICLE_TYPES.E46_Z4) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                DIAGNOSTIC_JOBS.ZKE5_CENTRAL_LOCK,    
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_CENTRAL_LOCK,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        }               
    }

    public lockAllDoors(vehicleType: VEHICLE_TYPE): void {
        var payload: Buffer;
        if (vehicleType === VEHICLE_TYPES.E46_Z4) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_ALL,    
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_ALL,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        }              
    }

    public lockHighSideDoors(vehicleType: VEHICLE_TYPE): void {
        var payload: Buffer;
        if (vehicleType === VEHICLE_TYPES.E46_Z4) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                DIAGNOSTIC_JOBS.ZKE5_LOCK_ALL,    
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_HIGH,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        }              
    }

    public lockLowSideDoors(vehicleType: VEHICLE_TYPE): void {
        var payload: Buffer;
        if (vehicleType === VEHICLE_TYPES.E46_Z4) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                DIAGNOSTIC_JOBS.ZKE5_LOCK_ALL,    
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_LOW,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        }              
    }

    public unllockAllDoors(vehicleType: VEHICLE_TYPE): void {
        var payload: Buffer;
        if (vehicleType === VEHICLE_TYPES.E46_Z4) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                DIAGNOSTIC_JOBS.ZKE5_UNLOCK_ALL,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_CENTRAL_LOCK,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        }              
    }

    public unlockHighSideDoors(vehicleType: VEHICLE_TYPE): void {
        var payload: Buffer;
        if (vehicleType === VEHICLE_TYPES.E46_Z4) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                DIAGNOSTIC_JOBS.ZKE5_UNLOCK_ALL,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_UNLOCK_HIGH,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        }        
    }

    public unlockLowSideDoors(vehicleType: VEHICLE_TYPE): void {
        var payload: Buffer;
        if (vehicleType === VEHICLE_TYPES.E46_Z4) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                DIAGNOSTIC_JOBS.ZKE5_UNLOCK_LOW,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_UNLOCK_LOW,
                0x01
            ]);
            this.sendDiagnosticMessage(payload);
        }        
    }    

    public foldMirror(mirror: SIDE_MIRROR): void {
        const payload: Buffer = Buffer.from([
            BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
            mirror,
            DIAGNOSTIC_JOBS.FOLD_MIRROR,
            0x01
        ]);
        this.sendDiagnosticMessage(payload);
    }
    
    public unfoldMirror(mirror: SIDE_MIRROR): void {
        const payload: Buffer = Buffer.from([
            BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
            mirror,
            DIAGNOSTIC_JOBS.UNFOLD_MIRROR,
            0x01
        ]);
        this.sendDiagnosticMessage(payload);
    }

    public openWindow(window: WINDOW): void {
        var job: DIAGNOSTIC_JOB;

        switch (window) {
            case WINDOWS.DRIVER_FRONT: job = DIAGNOSTIC_JOBS.OPEN_WINDOW_DRIVER_FRONT; break;
            case WINDOWS.DRIVER_REAR: job = DIAGNOSTIC_JOBS.OPEN_WINDOW_DRIVER_REAR; break;
            case WINDOWS.PASSENGER_FRONT: job = DIAGNOSTIC_JOBS.OPEN_WINDOW_PASSENGER_FRONT; break;
            case WINDOWS.PASSENGER_REAR: job = DIAGNOSTIC_JOBS.OPEN_WINDOW_PASSENGER_REAR; break;
            default: return;
        }

        this.sendWindowJob(job);
    }

    public closeWindow(window: WINDOW): void {
        var job: DIAGNOSTIC_JOB;

        switch (window) {
            case WINDOWS.DRIVER_FRONT: job = DIAGNOSTIC_JOBS.CLOSE_WINDOW_DRIVER_FRONT; break;
            case WINDOWS.DRIVER_REAR: job = DIAGNOSTIC_JOBS.CLOSE_WINDOW_DRIVER_REAR; break;
            case WINDOWS.PASSENGER_FRONT: job = DIAGNOSTIC_JOBS.CLOSE_WINDOW_PASSENGER_FRONT; break;
            case WINDOWS.PASSENGER_REAR: job = DIAGNOSTIC_JOBS.CLOSE_WINDOW_PASSENGER_REAR; break;
            default: return;
        }

        this.sendWindowJob(job);
    }

    private sendWindowJob(job: DIAGNOSTIC_JOB): void {
        const payload: Buffer = Buffer.from([
            BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
            job,
            0x01
        ]);
        this.sendDiagnosticMessage(payload);
    }
}

