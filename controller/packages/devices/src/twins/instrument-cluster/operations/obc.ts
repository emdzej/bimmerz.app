import { DEVICE, IBusInterface, KNOWN_DEVICE, KNOWN_DEVICES } from "@bimmerz/bus";
import { WRITEABLE_OBC_PROPERTY } from "@bimmerz/commands";

import { Logger } from "@bimmerz/core";
import { DeviceOperations } from "../../../devices";

export class OBCOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(ibusInterface, logger);
    }

    private set(property: WRITEABLE_OBC_PROPERTY, value: any, source: DEVICE = KNOWN_DEVICES.GraphicsNavigationDriver) {

    }
}