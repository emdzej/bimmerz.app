import { IBusMessageParser } from "@bimmerz/bus";

export type ParserRegistry<P> = Record<keyof P, P[keyof P]>;

export type BuilderRegistry<B> = Record<keyof B, B[keyof B]>;