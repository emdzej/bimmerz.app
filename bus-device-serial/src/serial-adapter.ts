import { Logger } from "@bimmerz/core";
import { BusAdapter, IBusMessage, IBusProtocol } from "@bimmerz/ibus";

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