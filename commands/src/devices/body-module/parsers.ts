import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, IBusMessage, IBusMessageParser } from "@bimmerz/ibus";
import { BODY_MODULE_VARIANT, BODY_MODULE_VARIANT_INDEX, CENTRAL_LOCKING_STATUS, DOOR_LID_STATUS, DoorLidStatuses, DorLidStatus, LAMP_STATUS, WINDOW_STATUS, WindowStatuses } from "./types";
import { COMMANDS, validateCommand } from "../../types";

export type BodyModuleDoorLidStatusResponseParser = IBusMessageParser<DorLidStatus>;

export function parseBodyModuleDoorLidStatusResponse(message: IBusMessage): DorLidStatus {
    validateCommand(COMMANDS.DOOR_LID_STATUS_RESPONSE, message);
    
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
    return {
        doorLidStatuses,
        centralLockingStatus: centralLockStatus as CENTRAL_LOCKING_STATUS,
        interiorLightStatus: lampIndicator as LAMP_STATUS,
        windowStatuses
    };
}

export type BodyModuleDiagnosticResponseParser = IBusMessageParser<BODY_MODULE_VARIANT>;

export function parseBodyModuleDiagnosticResponse(message: IBusMessage): BODY_MODULE_VARIANT {
    validateCommand(COMMANDS.DIAGNOSTIC_RESPONSE, message);
    
    const variant = message.payload[BODY_MODULE_VARIANT_INDEX] as BODY_MODULE_VARIANT;
    return variant;
}
