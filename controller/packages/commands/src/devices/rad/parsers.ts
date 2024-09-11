import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, DATA_BYTE_3_INDEX, IBusMessage, IBusMessageParser } from "@bimmerz/bus";

import { KNOWN_COMMANDS, ParserRegistry, validateCommand } from "../../types";

export type RadParsedCommandTypes = {
    
};

export const RAD_COMMAND_PARSERS: ParserRegistry<RadParsedCommandTypes> = {
} as const;