import { KNOWN_DEVICES, IBusInterface, IBusMessage } from "@bimmerz/bus";
import { DeviceTwin } from "../device-twin";
import { RadioEvents } from "./events";
import { Logger } from "@bimmerz/core";

export class Radio extends DeviceTwin<RadioEvents> {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.RADIO, 'Radio', ibusInterface, logger);
    }

    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.isPresent = true;
        this.emit("moduleStatusResponse", { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.emit("moduleStatusRequest", { source: message.source, destination: message.destination });
    }
}

