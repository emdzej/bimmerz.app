import * as ds from "@devicescript/core"
import { Logger, createLogger, LoggingFunction, LogLevel } from "@bimmerz/core";
import { IBusMessage, IBusProtocol, BusAdapter } from "@bimmerz/ibus";

export class SerialAdapter  extends BusAdapter {
    private _logger: Logger;
    private _protocol: IBusProtocol;

    constructor(protocol: IBusProtocol, logger: Logger) {
        super();
        this._logger = logger;
        this._protocol = protocol;
    }

    public send(message: IBusMessage): void {
        throw new Error("Method not implemented.");
    }
}

export class ConsoleLogger implements Logger {
    public debug: LoggingFunction = console.debug;
    public info: LoggingFunction = console.info;
    public warn: LoggingFunction = console.warn;
    public error: LoggingFunction = console.error;

    constructor(name: string, level: LogLevel = "debug") {
    
    }        
}

const protocol = new IBusProtocol(createLogger(ConsoleLogger, "IBusProtocol"));
const adapter = new SerialAdapter(protocol, createLogger(ConsoleLogger, "SerialAdapter"));


setInterval(() => {
    console.debug(":)")
}, 1000)
