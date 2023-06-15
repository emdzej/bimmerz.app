import { IBusInterface, KNOWN_DEVICES } from "@bimmerz/ibus-core";
import logger from 'pino';
import { VEHICLE_TYPE, VEHICLE_TYPES } from "../../instrument-cluster";
import { BODY_MODULE_COMMANDS, DIAGNOSTIC_JOBS } from "../types";
import { DiagnosticOperations } from "../../types";

export class CentralLockingOperations extends DiagnosticOperations {
    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.BodyModule, ibusInterface, logger({ name: 'CentralLockingOperations', level: 'debug' }));
    }

    public pressCenterLockButton(vehicleType: VEHICLE_TYPE): void {
        var payload: Buffer;
        if (vehicleType === VEHICLE_TYPES.E46_Z4) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                DIAGNOSTIC_JOBS.ZKE5_CENTRAL_LOCK,    
                0x01
            ]);
            this.sendMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_CENTRAL_LOCK,
                0x01
            ]);
            this.sendMessage(payload);
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
            this.sendMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_ALL,
                0x01
            ]);
            this.sendMessage(payload);
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
            this.sendMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_HIGH,
                0x01
            ]);
            this.sendMessage(payload);
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
            this.sendMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_LOW,
                0x01
            ]);
            this.sendMessage(payload);
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
            this.sendMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_CENTRAL_LOCK,
                0x01
            ]);
            this.sendMessage(payload);
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
            this.sendMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_UNLOCK_HIGH,
                0x01
            ]);
            this.sendMessage(payload);
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
            this.sendMessage(payload);
        } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
            payload = Buffer.from([
                BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
                0x00, // Sub-Module
                DIAGNOSTIC_JOBS.ZKE3_GM4_UNLOCK_LOW,
                0x01
            ]);
            this.sendMessage(payload);
        }        
    }    
}