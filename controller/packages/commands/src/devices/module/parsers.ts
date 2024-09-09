import { IBusMessage } from "@bimmerz/bus";

import { validateCommand, KNOWN_COMMANDS } from "../../types";
import { MODULE_STATUS } from "./types";

/*
//vARIANT 0b1111_1000
GT_VM           = 0b0001_0
GT_NAV          = 0b0100_0  # incl. MK1

NAV_MK4         = 0b0100_0
NAV_MK4_ASSIST  = 0b1100_0

TEL_CMT         = 0b0000_0  # CMT3000
TEL_MOTO_V      = 0b0011_0  # Motorola V-Series
TEL_TCU         = 0b0011_1  # Everest

BMBT_4_3        = 0b0000_0
BMBT_16_9       = 0b0011_0

*/

export const MODULE_VARIANTS = {
    GT_VM           : 0b00010000 >> 3,
    GT_NAV          : 0b01000000 >> 3,
    NAV_MK4         : 0b01000000 >> 3,
    NAV_MK4_ASSIST  : 0b11000000 >> 3,
    TEL_CMT         : 0b00000000 >> 3,
    TEL_MOTO_V      : 0b00110000 >> 3,
    TEL_TCU         : 0b00111000 >> 3,
    BMBT_4_3        : 0b00000000 >> 3,
    BMBT_16_9       : 0b00110000 >> 3
} as const;

export type MODULE_VARIANT = typeof MODULE_VARIANTS[keyof typeof MODULE_VARIANTS];

export type ModuleStatusResponse = {
    status: MODULE_STATUS;
    variant?:  MODULE_VARIANT;
}

export function parseModuleStatusResponse(message: IBusMessage): ModuleStatusResponse {
    validateCommand(KNOWN_COMMANDS.MODULE_STATUS_RESPONSE, message);
    const result: ModuleStatusResponse = {
        status: (message.payload[0] & 1) as MODULE_STATUS,
        variant: (message.payload[0] & 0b11111000) >> 3 as MODULE_VARIANT
    }
    return result;
}