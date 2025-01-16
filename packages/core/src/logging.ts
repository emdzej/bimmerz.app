import logger, { LoggerOptions } from "pino";

export type LoggingFunction = {
    <T extends object>(obj: T, msg?: string, ...args: any[]): void;
    (obj: unknown, msg?: string, ...args: any[]): void;
    (msg: string, ...args: any[]): void;
}

export type LogLevel =   "error" | "warn" | "info" |  "trace" | "debug";

export type LoggerConstructor = {
    new(name: string, level: LogLevel): Logger;    
}

export type Logger = {
    debug: LoggingFunction;
    info: LoggingFunction;
    warn: LoggingFunction
    error: LoggingFunction;    
    trace: LoggingFunction;    
};

export function createLogger(ctor: LoggerConstructor, name: string, level: LogLevel = "debug"): Logger {
    return new ctor(name, level);
}

export class PinoLogger implements Logger {
    public debug: LoggingFunction;
    public info: LoggingFunction;
    public warn: LoggingFunction;
    public error: LoggingFunction;
    public trace: LoggingFunction;
    private _logger: Logger;

    constructor(name: string, level: LogLevel = "debug") {
        this._logger = logger({ name: name, level });
        this.debug = this._logger.debug.bind(this._logger);
        this.info = this._logger.info.bind(this._logger);
        this.warn = this._logger.warn.bind(this._logger);
        this.error = this._logger.error.bind(this._logger);
        this.trace = this._logger.trace.bind(this._logger);
    }
}

export class ConsoleLogger implements Logger {
    public debug: LoggingFunction;
    public info: LoggingFunction;
    public warn: LoggingFunction;
    public error: LoggingFunction;
    public trace: LoggingFunction;
    private _logger: Logger;

    constructor(name: string, level: LogLevel = "debug") {
        this._logger = console;
        if (level === "debug") {
            this.debug = this._logger.debug.bind(this._logger);
        } else {
            this.debug = () => {};
        }
        this.info = this._logger.info.bind(this._logger);
        this.warn = this._logger.warn.bind(this._logger);
        this.error = this._logger.error.bind(this._logger);
        if (level === "trace" || level === "debug") {
            this.trace = this._logger.trace.bind(this._logger);
        } else {
            this.trace = () => {};
        }        
    }
}