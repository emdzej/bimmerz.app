import * as ds from "@devicescript/core"
import { Logger, createLogger, LoggingFunction, LogLevel } from "@bimmerz/core";
import { IBusMessage, IBusProtocol, BusAdapter, ProtocolCallback } from "@bimmerz/ibus";

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