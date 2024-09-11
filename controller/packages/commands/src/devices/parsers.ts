import { IBusMessage, KNOWN_DEVICE, KNOWN_DEVICES } from "@bimmerz/bus";
import { COMMAND, DeviceParserRegistry, KNWON_COMMAND } from "../types";
import { GM_COMMAND_PARSERSS } from "./gm";
import { RAD_COMMAND_PARSERS } from "./rad";
import { RLS_COMMAND_PARSERS } from "./rls";
import { IKE_COMMAND_PARSERS } from "./ike";
import { LCM_COMMAND_PARSERS } from "./lcm";
import { MFL_COMMAND_PARSERS } from "./mfl";
import { CDC_COMMAND_PARSERS } from "./cdc";
import { Logger } from "@bimmerz/core";

export const DEVICE_COMMAND_PARSERS: DeviceParserRegistry = {
    [KNOWN_DEVICES.GM]: GM_COMMAND_PARSERSS,
    [KNOWN_DEVICES.RAD]: RAD_COMMAND_PARSERS,
    [KNOWN_DEVICES.RLS]: RLS_COMMAND_PARSERS,
    [KNOWN_DEVICES.IKE]: IKE_COMMAND_PARSERS,
    [KNOWN_DEVICES.LCM]: LCM_COMMAND_PARSERS,
    [KNOWN_DEVICES.MFL]: MFL_COMMAND_PARSERS,
    [KNOWN_DEVICES.CDC]: CDC_COMMAND_PARSERS
} as const;

export function parseCommand(message: IBusMessage, logger: Logger): any {    
    const command = message.payload[0] as COMMAND;;

    if (DEVICE_COMMAND_PARSERS.hasOwnProperty(message.destination)) {
        const parsers = DEVICE_COMMAND_PARSERS[message.destination as KNOWN_DEVICE]!;
        if (parsers.hasOwnProperty(command)) {
            return parsers[command as KNWON_COMMAND]!(message);
        }
    }
    if (DEVICE_COMMAND_PARSERS.hasOwnProperty(message.source)) {
        const parsers = DEVICE_COMMAND_PARSERS[message.source as KNOWN_DEVICE]!;
        if (parsers.hasOwnProperty(command)) {
            return parsers[command as KNWON_COMMAND]!(message);
        }
    }
    
    return undefined;    
}