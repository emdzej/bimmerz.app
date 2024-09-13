import { DEVICE, IBusMessageBuilder, IBusMessage, KNOWN_DEVICES, KNOWN_DEVICE } from "@bimmerz/bus";
import { BuilderRegistry, KNOWN_COMMANDS } from "../../types";
import { VEHICLE_TYPE, VEHICLE_TYPES, buildDiagnosticRequest } from "../";
import { BODY_MODULE_DIAGNOSTIC_JOB, BODY_MODULE_DIAGNOSTIC_JOBS, SIDE_MIRROR, WINDOW, WINDOWS } from "./types";


export function buildBodyModuleDoorLidStatusRequest(source: DEVICE): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.DOOR_LID_STATUS_REQUEST
    ];
    const message: IBusMessage = {
        source,
        destination: KNOWN_DEVICES.GM,
        payload
    }
    return message;
}


export function buildBodyModuleCentralButtonPress(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: number[];
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = [
            KNOWN_COMMANDS.VC,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_CENTRAL_LOCK,    
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = [
            KNOWN_COMMANDS.VC,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_CENTRAL_LOCK,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    }               
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}


export function buildBodyModuleLockAllDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: number[];
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = [
            KNOWN_COMMANDS.VC,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_ALL,    
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = [
            KNOWN_COMMANDS.VC,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_ALL,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    }              
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}


export function buildBodyModuleLockHighSideDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: number[];
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = [
            KNOWN_COMMANDS.VC,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_LOCK_ALL,    
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = [
            KNOWN_COMMANDS.VC,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_HIGH,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    }              
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}


export function buildBodyModuleLockLowSideDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: number[];
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = [
            KNOWN_COMMANDS.VC,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_LOCK_ALL,    
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = [
            KNOWN_COMMANDS.VC,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_LOCK_LOW,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    }              
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}

export function buildBodyModuleUnlockAllDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: number[];
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = [
            KNOWN_COMMANDS.VC,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_UNLOCK_ALL,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = [
            KNOWN_COMMANDS.VC,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_CENTRAL_LOCK,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    }              
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}

export function buildBodyModuleUnlockHighSideDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: number[];
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = [
            KNOWN_COMMANDS.VC,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_UNLOCK_ALL,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = [
            KNOWN_COMMANDS.VC,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_UNLOCK_HIGH,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    }        
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);
}

export function buildBodyModuleUnlockLowSideDoors(vehicleType: VEHICLE_TYPE): IBusMessage {
    var payload: number[];
    if (vehicleType === VEHICLE_TYPES.E46_Z4) {
        payload = [
            KNOWN_COMMANDS.VC,
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE5_UNLOCK_LOW,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    } else if (vehicleType === VEHICLE_TYPES.E38_E39_E53) {
        payload = [
            KNOWN_COMMANDS.VC,
            0x00, // Sub-Module
            BODY_MODULE_DIAGNOSTIC_JOBS.ZKE3_GM4_UNLOCK_LOW,
            0x01
        ];
        return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
    }
    throw new Error(`Unsupported vehicle type: ${vehicleType}`);        
}    

export function buildBodyModuleFoldMirror(mirror: SIDE_MIRROR): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.VC,
        mirror,
        BODY_MODULE_DIAGNOSTIC_JOBS.FOLD_MIRROR,
        0x01
    ];
    return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
}

export function buildBodyModuleUnfoldMirror(mirror: SIDE_MIRROR): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.VC,
        mirror,
        BODY_MODULE_DIAGNOSTIC_JOBS.UNFOLD_MIRROR,
        0x01
    ];
    return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
}


export function buildBodyModuleOpenWindow(window: WINDOW): IBusMessage {
    var job: BODY_MODULE_DIAGNOSTIC_JOB;

    switch (window) {
        case WINDOWS.DRIVER_FRONT: job = BODY_MODULE_DIAGNOSTIC_JOBS.OPEN_WINDOW_DRIVER_FRONT; break;
        case WINDOWS.DRIVER_REAR: job = BODY_MODULE_DIAGNOSTIC_JOBS.OPEN_WINDOW_DRIVER_REAR; break;
        case WINDOWS.PASSENGER_FRONT: job = BODY_MODULE_DIAGNOSTIC_JOBS.OPEN_WINDOW_PASSENGER_FRONT; break;
        case WINDOWS.PASSENGER_REAR: job = BODY_MODULE_DIAGNOSTIC_JOBS.OPEN_WINDOW_PASSENGER_REAR; break;        
    }

    const payload = [
        KNOWN_COMMANDS.VC,
        job,
        0x01
    ];

    return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
}

export function buildBodyModuleCloseWindow(window: WINDOW): IBusMessage {
    var job: BODY_MODULE_DIAGNOSTIC_JOB;

    switch (window) {
        case WINDOWS.DRIVER_FRONT: job = BODY_MODULE_DIAGNOSTIC_JOBS.CLOSE_WINDOW_DRIVER_FRONT; break;
        case WINDOWS.DRIVER_REAR: job = BODY_MODULE_DIAGNOSTIC_JOBS.CLOSE_WINDOW_DRIVER_REAR; break;
        case WINDOWS.PASSENGER_FRONT: job = BODY_MODULE_DIAGNOSTIC_JOBS.CLOSE_WINDOW_PASSENGER_FRONT; break;
        case WINDOWS.PASSENGER_REAR: job = BODY_MODULE_DIAGNOSTIC_JOBS.CLOSE_WINDOW_PASSENGER_REAR; break;     
    }

    const payload = [
        KNOWN_COMMANDS.VC,
        job,
        0x01
    ];

    return buildDiagnosticRequest(payload, KNOWN_DEVICES.GM);
}

export type GmBuiltCommandTypes = {
    requestDoorLidStatus: DEVICE;
    pressCentralLockButton: VEHICLE_TYPE;
    lockAllDoors: VEHICLE_TYPE;
    lockHighSideDoors: VEHICLE_TYPE;
    lockLowSideDoors: VEHICLE_TYPE;
    unlockAllDoors: VEHICLE_TYPE;
    unlockHighSideDoors: VEHICLE_TYPE;
    unlockLowSideDoors: VEHICLE_TYPE;
    foldMirror: SIDE_MIRROR;
    unfoldMirror: SIDE_MIRROR;
    openWindow: WINDOW;
    closeWindow: WINDOW;
};

export const GM_COMMAND_BUILDERS: BuilderRegistry<GmBuiltCommandTypes> = {
    requestDoorLidStatus: buildBodyModuleDoorLidStatusRequest,
    pressCentralLockButton: buildBodyModuleCentralButtonPress,
    lockAllDoors: buildBodyModuleLockAllDoors,
    lockHighSideDoors: buildBodyModuleLockHighSideDoors,
    lockLowSideDoors: buildBodyModuleLockLowSideDoors,
    unlockAllDoors: buildBodyModuleUnlockAllDoors,
    unlockHighSideDoors: buildBodyModuleUnlockHighSideDoors,
    unlockLowSideDoors: buildBodyModuleUnlockLowSideDoors,
    foldMirror: buildBodyModuleFoldMirror,
    unfoldMirror: buildBodyModuleUnfoldMirror,
    openWindow: buildBodyModuleOpenWindow,
    closeWindow: buildBodyModuleCloseWindow
} as const;
