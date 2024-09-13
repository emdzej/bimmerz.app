import { IBusMessageBuilder, IBusMessageParser, KNOWN_DEVICE } from "@bimmerz/bus";
import { KNWON_COMMAND } from "./commands";

export type ParsedTypes = Partial<Record<KNWON_COMMAND, any>>;

export type ParserRegistry<P extends ParsedTypes> = {
    [K in keyof P]: IBusMessageParser<P[K]>;
};

export type DeviceParserRegistry = Partial<Record<KNOWN_DEVICE, Partial<ParserRegistry<ParsedTypes>>>>;

export type DeviceBuiltTypes = "requestStatus" | "announce" | "reportPresence" | "reportStatus" | string;

export type BuiltTypes = Record<DeviceBuiltTypes, any>;

export type BuilderRegistry<B extends BuiltTypes> = {
    [K in keyof B]: IBusMessageBuilder<B[K]>;
};

export type BuilderArgumentParser<T> = (...args: string[]) => T;

export type BuilderArgumentParserRegistry<B extends BuiltTypes> = {
    [K in keyof B]: BuilderArgumentParser<B[K]>;
};

export type DeviceBuilderRegistry = Partial<Record<KNOWN_DEVICE, Partial<BuilderRegistry<BuiltTypes>>>>;

