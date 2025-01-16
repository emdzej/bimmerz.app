import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, IBusMessage, IBusMessageParser } from "@bimmerz/bus";
import { BODY_MODULE_VARIANT, BODY_MODULE_VARIANT_INDEX, CENTRAL_LOCKING_STATUS, DOOR_LID_STATUS, DoorLidStatuses, DorLidStatus, LAMP_STATUS, WINDOW_STATUS, WindowStatuses } from "./types";
import { KNOWN_COMMANDS, KNWON_COMMAND, ParserRegistry, validateCommand } from "../../types";

export function parseBodyModuleDoorLidStatusResponse(message: IBusMessage): DorLidStatus {
    validateCommand(KNOWN_COMMANDS.DOOR_LID_STATUS_RESPONSE, message);
    
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

export function parseBodyModuleDiagnosticResponse(message: IBusMessage): BODY_MODULE_VARIANT {
    validateCommand(KNOWN_COMMANDS.DD, message);
    
    const variant = message.payload[BODY_MODULE_VARIANT_INDEX] as BODY_MODULE_VARIANT;
    return variant;
}

// body module response to request identity from DIAG

// Data="84 11 42 82 11 02 40 12 25 02 01 20"    [„ B‚  @ %   ]

/*
GM  	Body module
Part number 4 114 282, version HW 11, SW 20, made by Reinshagen (Delphi) on 25/02 (czerwiec 2002)
Diagnostic index 40, Bus index 12, Coding index 02
Stored Fault Codes: 4   []

3F 04 00 04 01 3E	DIA	GM	Read fault memory	Block 01
00 03 3F A0 9C	GM	DIA	Diagnostic command acknowledged	Data=""    []
3F 03 00 00 3C	DIA	GM	Read identity	
00 0F 3F A0 84 11 42 82 11 02 40 12 25 02 01 20 82	GM	DIA	Diagnostic command acknowledged	Data="84 11 42 82 11 02 40 12 25 02 01 20"    [„ B‚  @ %   ]


--------------------------------------------------
Summary of stored Fault Codes:

Module	Qty	Fault Codes
GM	4	
--------------------------------------------------
Detailed fault code info

Module	Nbr	Code	Freq	Description
GM	1	  	0	Unknown

--------------------------------------------------
*/
export type GmParsedCommandTypes = {
    [KNOWN_COMMANDS.DOOR_LID_STATUS_RESPONSE]: DorLidStatus;
    [KNOWN_COMMANDS.DD]: BODY_MODULE_VARIANT;
};

export const GM_COMMAND_PARSERSS: ParserRegistry<GmParsedCommandTypes> = {
    [KNOWN_COMMANDS.DOOR_LID_STATUS_RESPONSE]: parseBodyModuleDoorLidStatusResponse,
    [KNOWN_COMMANDS.DD]: parseBodyModuleDiagnosticResponse
} as const;
