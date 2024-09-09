import { DEVICE, IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { KNOWN_COMMANDS } from "../../types";
import { VEHICLE_TYPE, VEHICLE_TYPES, buildDiagnosticRequest } from "../";
import { BODY_MODULE_DIAGNOSTIC_JOB, BODY_MODULE_DIAGNOSTIC_JOBS, SIDE_MIRROR, WINDOW, WINDOWS } from "./types";

export type BodyModuleDoorLidStatusRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildBodyModuleDoorLidStatusRequest(source: DEVICE): IBusMessage {
    const payload = Buffer.from([
        KNOWN_COMMANDS.DOOR_LID_STATUS_REQUEST
    ]);
    const message: IBusMessage = {
        source,
        destination: KNOWN_DEVICES.BODY_MODULE,
        payload
    }
    return message;
}

export type BodyModuleCentralButtonPressBuilder = IBusMessageBuilder<VEHICLE_TYPE>;

export function buildBodyModuleCentralButtonPress(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: Buffer;
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_CENTRAL_LOCK,    
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_CENTRAL_LOCK,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    }               
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}

export type BodyModuleLockAllDoorsBuilder = IBusMessageBuilder<VEHICLE_TYPE>;

export function buildBodyModuleLockAllDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: Buffer;
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_ALL,    
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_ALL,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    }              
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}

export type BodyModuleLockHighSideDoorsBuilder = IBusMessageBuilder<VEHICLE_TYPE>;

export function buildBodyModuleLockHighSideDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: Buffer;
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_LOCK_ALL,    
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_HIGH,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    }              
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}

export type BodyModuleLockLowSideDoorsBuilder = IBusMessageBuilder<VEHICLE_TYPE>;

export function buildBodyModuleLockLowSideDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: Buffer;
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_LOCK_ALL,    
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_LOW,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    }              
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}

export type BodyModuleUnlockAllDoorsBuilder = IBusMessageBuilder<VEHICLE_TYPE>;

export function buildBodyModuleUnlockAllDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: Buffer;
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_UNLOCK_ALL,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_CENTRAL_LOCK,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    }              
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}

export type BodyModuleUnlockHighSideDoorsBuilder = IBusMessageBuilder<VEHICLE_TYPE>;

export function buildBodyModuleUnlockHighSideDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: Buffer;
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_UNLOCK_ALL,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_UNLOCK_HIGH,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    }        
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}

export type BodyModuleUnlockLowSideDoorsBuilder = IBusMessageBuilder<VEHICLE_TYPE>;

export function buildBodyModuleUnlockLowSideDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: Buffer;
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_UNLOCK_LOW,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = Buffer.from([
            KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_UNLOCK_LOW,
            0x01
        ]);
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
    }
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);        
}    

export type BodyModuleFoldMirrorBuilder = IBusMessageBuilder<SIDE_MIRROR>;

export function buildBodyModuleFoldMirror(mirror: SIDE_MIRROR): IBusMessage {
    const payload: Buffer = Buffer.from([
        KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
        mirror,
        BODY_MODULE_DIAGNOSTIC_JOBS.FOLD_MIRROR,
        0x01
    ]);
    return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
}

export type BodyModuleUnfoldMirrorBuilder = IBusMessageBuilder<SIDE_MIRROR>;

export function buildBodyModuleUnfoldMirror(mirror: SIDE_MIRROR): IBusMessage {
    const payload: Buffer = Buffer.from([
        KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
        mirror,
        BODY_MODULE_DIAGNOSTIC_JOBS.UNFOLD_MIRROR,
        0x01
    ]);
    return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
}

export type BodyModuleOpenWindowBuilder = IBusMessageBuilder<WINDOW>;

export function buildBodyModuleOpenWindow(window: WINDOW): IBusMessage {
    var job: BODY_MODULE_DIAGNOSTIC_JOB;

    switch (window) {
        case WINDOWS.DRIVER_FRONT: job = BODY_MODULE_DIAGNOSTIC_JOBS.OPEN_WINDOW_DRIVER_FRONT; break;
        case WINDOWS.DRIVER_REAR: job = BODY_MODULE_DIAGNOSTIC_JOBS.OPEN_WINDOW_DRIVER_REAR; break;
        case WINDOWS.PASSENGER_FRONT: job = BODY_MODULE_DIAGNOSTIC_JOBS.OPEN_WINDOW_PASSENGER_FRONT; break;
        case WINDOWS.PASSENGER_REAR: job = BODY_MODULE_DIAGNOSTIC_JOBS.OPEN_WINDOW_PASSENGER_REAR; break;        
    }

    const payload: Buffer = Buffer.from([
        KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
        job,
        0x01
    ]);

    return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
}

export type BodyModuleCloseWindowBuilder = IBusMessageBuilder<WINDOW>;

export function buildBodyModuleCloseWindow(window: WINDOW): IBusMessage {
    var job: BODY_MODULE_DIAGNOSTIC_JOB;

    switch (window) {
        case WINDOWS.DRIVER_FRONT: job = BODY_MODULE_DIAGNOSTIC_JOBS.CLOSE_WINDOW_DRIVER_FRONT; break;
        case WINDOWS.DRIVER_REAR: job = BODY_MODULE_DIAGNOSTIC_JOBS.CLOSE_WINDOW_DRIVER_REAR; break;
        case WINDOWS.PASSENGER_FRONT: job = BODY_MODULE_DIAGNOSTIC_JOBS.CLOSE_WINDOW_PASSENGER_FRONT; break;
        case WINDOWS.PASSENGER_REAR: job = BODY_MODULE_DIAGNOSTIC_JOBS.CLOSE_WINDOW_PASSENGER_REAR; break;     
    }

    const payload: Buffer = Buffer.from([
        KNOWN_COMMANDS.DIAGNOSTIC_REQUEST,
        job,
        0x01
    ]);

    return buildDiagnosticRequest(payload, KNOWN_DEVICES.BODY_MODULE);
}