import { IBusMessageParser, KNOWN_DEVICE } from "@bimmerz/bus";
import { KNWON_COMMAND } from "./commands";

export type ParsedTypes = Partial<Record<KNWON_COMMAND, any>>;

export type ParserRegistry<P extends ParsedTypes> = Record<keyof P, IBusMessageParser<P[keyof P]>>;

export type DeviceParserRegistry = Partial<Record<KNOWN_DEVICE, Partial<ParserRegistry<ParsedTypes>>>>;

export type BuilderRegistry<B> = Record<keyof B, B[keyof B]>;