import * as ds from "@devicescript/core"
import { Logger, createLogger, LoggingFunction, LogLevel } from "@bimmerz/core";

export class ConsoleLogger implements Logger {
    constructor(name: string, level: LogLevel = "debug") {
   
    }        
    debug: LoggingFunction;
    info: LoggingFunction;
    warn: LoggingFunction;
    error: LoggingFunction;
}