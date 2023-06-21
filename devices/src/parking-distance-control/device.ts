import { KNOWN_DEVICES, IBusInterface, IBusMessage } from "@bimmerz/ibus";
import { DeviceTwin } from "../device-twin";

import { ParkingDistanceControlModuleEvents } from "./events";

import { Logger } from "@bimmerz/core";
export class ParkingDistanceControlModule extends DeviceTwin<ParkingDistanceControlModuleEvents> {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.ParkDistanceControl, 'Parking Distance Control Module', ibusInterface, logger);
    };

    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.isPresent = true;
        this.emit("moduleStatusResponse", { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.emit("moduleStatusRequest", { source: message.source, destination: message.destination });
    }
}