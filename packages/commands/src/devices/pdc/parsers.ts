import { IBusMessage } from "@bimmerz/bus";
import { validateCommand, KNOWN_COMMANDS, ParserRegistry } from "../../types";
import { PDCSensorsStatus } from "./types";
import { checkBit } from "@bimmerz/core";

export function parsePdcSensorStatus(message: IBusMessage): PDCSensorsStatus {
    validateCommand(KNOWN_COMMANDS.DD, message);
    const result: PDCSensorsStatus = {
        // 14th byte in message
        active: checkBit(message.payload[10], 0),
    }
    if (result.active) {
        result.frontLeft = message.payload[6]; // 10th byte in message
        result.frontCenterLeft = message.payload[8]; // 12th byte in message
        result.frontCenterRight = message.payload[9]; // 13th byte in message
        result.frontRight = message.payload[7]; // 11th byte in message
        result.rearLeft = message.payload[2]; // 6th byte in message
        result.rearCenterLeft = message.payload[4]; // 8th byte in message
        result.rearCenterRight = message.payload[5]; // 9th byte in message
        result.rearRight = message.payload[3]; // 7th byte in message
    }
    return result;
}

export type PdcParsedCommandTypes = {
    [KNOWN_COMMANDS.DD]: PDCSensorsStatus;
};

export const PDC_COMMAND_PARSERS: ParserRegistry<PdcParsedCommandTypes> = {
    [KNOWN_COMMANDS.DD]: parsePdcSensorStatus
} as const;