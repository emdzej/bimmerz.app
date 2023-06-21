export type LoggingFunction = {
    <T extends object>(obj: T, msg?: string, ...args: any[]): void;
    (obj: unknown, msg?: string, ...args: any[]): void;
    (msg: string, ...args: any[]): void;
}

export type LoggerConstructor = {
    new(name: string): Logger;
}

export type Logger = {
    debug: LoggingFunction;
    info: LoggingFunction;
    warn: LoggingFunction
    error: LoggingFunction;    
};

export function createLogger(ctor: LoggerConstructor, name: string): Logger {
    return new ctor(name);
}

export class ConsoleLogger implements Logger {
    public debug: LoggingFunction = console.debug;
    public info: LoggingFunction = console.info;
    public warn: LoggingFunction = console.warn;
    public error: LoggingFunction = console.error;

    constructor(name: string) {
    
    }        
}