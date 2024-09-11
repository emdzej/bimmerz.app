import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, DATA_BYTE_3_INDEX, IBusMessage, IBusMessageParser } from "@bimmerz/bus";
import { CODING_INDEX_OFFSET, DIAGNOSTIC_INDEX_OFFSSET, DIMMER_OFFSET, LIGHT_CHECK_STATUS_BITS, LIGHT_MODULE_VARIANT, LIGHT_MODULE_VARIANTS, LIGHT_STATUS_BITS, LME38_DIMMER_OFFSET, LOAD_FRONT_OFFSET, LOAD_REAR_OFFSET, LightControlModuleDiagnosticResponse, LigthStatus, PHOTO_OFFSET } from "./types";
import { KNOWN_COMMANDS,  ParserRegistry,  validateCommand } from "../../types";
import { checkBit } from "@bimmerz/core";


export type LightControlModuleDiagnosticResponseParser = IBusMessageParser<LightControlModuleDiagnosticResponse>;

export function parseLightControlModuleDiagnosticResponse(message: IBusMessage): LightControlModuleDiagnosticResponse {
    validateCommand(KNOWN_COMMANDS.DD, message);

    const response: LightControlModuleDiagnosticResponse = {};
    if (message.length == 0x0F) {
        // based on BlueMod
        response.variant = determineLightModuleVariant(message);        
    } else if (message.length == 0x19) {
        // LME38 has unique status. It's shorter, and different mapping.
        // Length is an (educated) guess based on number of bytes required to
        // populate the job results.
        response.dimmerVoltage = message.payload[LME38_DIMMER_OFFSET];
    } else if (message.length == 0x23) {
         // Front load sensor voltage (Xenon)
        response.frontLoadVoltage = message.payload[LOAD_FRONT_OFFSET];
        // Dimmer (58G) voltage
        response.dimmerVoltage = message.payload[DIMMER_OFFSET];
        // Rear load sensor voltage (Xenon) / manual vertical aim control (non-Xenon)
        response.rearLoadVoltage = message.payload[LOAD_REAR_OFFSET];            
        // Photosensor voltage (LSZ)
        response.photoVoltage = message.payload[PHOTO_OFFSET];
    }        
    return response;
}


function determineLightModuleVariant(message: IBusMessage): LIGHT_MODULE_VARIANT | undefined {
    const diagnosticIndex = message.payload[DIAGNOSTIC_INDEX_OFFSSET];
    const codingIndex = message.payload[CODING_INDEX_OFFSET];
    var variant: LIGHT_MODULE_VARIANT | undefined;
    if (diagnosticIndex < 0x10) {
        variant = LIGHT_MODULE_VARIANTS.LME38;            
    } else if (diagnosticIndex == 0x10) {            
        variant = LIGHT_MODULE_VARIANTS.LCM;
    } else if (diagnosticIndex == 0x11) {
        variant = LIGHT_MODULE_VARIANTS.LCM_A;
    } else if (diagnosticIndex == 0x12 && codingIndex == 0x16) {
        variant = LIGHT_MODULE_VARIANTS.LCM_II;
    } else if (
        (diagnosticIndex == 0x12 && codingIndex == 0x17) 
        ||
        diagnosticIndex == 0x13
    ) {
        variant = LIGHT_MODULE_VARIANTS.LCM_III;
    } else if (diagnosticIndex == 0x14) {
        variant = LIGHT_MODULE_VARIANTS.LCM_IV;
    } else if (diagnosticIndex >= 0x20 && diagnosticIndex <= 0x2f) {
        variant = LIGHT_MODULE_VARIANTS.LSZ;
    } else if (diagnosticIndex == 0x30) {
        variant = LIGHT_MODULE_VARIANTS.LSZ_2;
    }
    return variant;
}

export type LightControlModuleLightStatusResponseParser = IBusMessageParser<LigthStatus>;

export function parseLightControlModuleLightStatusResponse(message: IBusMessage): LigthStatus {
    validateCommand(KNOWN_COMMANDS.LIGHT_STATUS_RESPONSE, message);

    const statuses = message.payload[DATA_BYTE_1_INDEX];
    const errors = message.payload[DATA_BYTE_2_INDEX];
    const lightStatus: LigthStatus = {
        rapidBlink: checkBit(statuses, LIGHT_STATUS_BITS.TURN_RAPID),
        turnRight: checkBit(statuses, LIGHT_STATUS_BITS.TURN_RIGHT),
        turnLeft: checkBit(statuses, LIGHT_STATUS_BITS.TURN_LEFT),
        fogRear: checkBit(statuses, LIGHT_STATUS_BITS.FOG_REAR),
        fogFront: checkBit(statuses, LIGHT_STATUS_BITS.FOG_FRONT),
        highBeam: checkBit(statuses, LIGHT_STATUS_BITS.HIGH_BEAM),
        lowBeam: checkBit(statuses, LIGHT_STATUS_BITS.LOW_BEAM),
        parking: checkBit(statuses, LIGHT_STATUS_BITS.PARKING),
        licensePlateCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.LICENSE_PLATE),
        turnRightCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.TURN_RIGHT),
        turnLeftCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.TURN_LEFT),
        fogRearCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.FOG_REAR),
        fogFrontCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.FOG_FRONT),
        highBeamCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.HIGH_BEAM),
        lowBeamCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.LOW_BEAM),
        parkingCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.PARKING),
    };
    return lightStatus;    
}

export type LcmParsedCommandTypes = {
    [KNOWN_COMMANDS.DD]: LightControlModuleDiagnosticResponse,
    [KNOWN_COMMANDS.LIGHT_STATUS_RESPONSE]: LigthStatus
};

export const LCM_COMMAND_PARSERS: ParserRegistry<LcmParsedCommandTypes> = {
    [KNOWN_COMMANDS.DD]: parseLightControlModuleDiagnosticResponse,
    [KNOWN_COMMANDS.LIGHT_STATUS_RESPONSE]: parseLightControlModuleLightStatusResponse
} as const;