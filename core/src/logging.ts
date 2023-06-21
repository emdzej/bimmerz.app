export type LoggingFunction = {
    <T extends object>(obj: T, msg?: string, ...args: any[]): void;
    (obj: unknown, msg?: string, ...args: any[]): void;
    (msg: string, ...args: any[]): void;
}

export type LogLevel =   "fatal" | "error" | "warn" | "info" | "silent" | "debug";

export type LoggerConstructor = {
    new(name: string, level: LogLevel): Logger;
}

export type Logger = {
    debug: LoggingFunction;
    info: LoggingFunction;
    warn: LoggingFunction
    error: LoggingFunction;    
};

export function createLogger(ctor: LoggerConstructor, name: string, level: LogLevel = "debug"): Logger {
    return new ctor(name, level);
}

