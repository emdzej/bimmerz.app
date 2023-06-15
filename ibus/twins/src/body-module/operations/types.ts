import { KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { IBusInterface } from "@bimmerz/ibus-core";
import { Logger, LoggerOptions } from "pino";
import { DeviceOperations } from "../../types";
import { IBusMessage } from "@bimmerz/ibus-core";

export abstract class DiagnosticOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, log: Logger<LoggerOptions>) {
        super(ibusInterface, log);
    }

    protected sendMessage(payload: Buffer): void {
        const message: IBusMessage = {
            source: KNOWN_DEVICES.Diagnostic,
            destination: KNOWN_DEVICES.BodyModule,
            payload
        }
        this.ibusInterface.sendMessage(message);
    }
}