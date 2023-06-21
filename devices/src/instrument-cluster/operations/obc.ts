import { DeviceOperations } from "../../types";
import { DEVICE, IBusInterface, KNOWN_DEVICE, KNOWN_DEVICES } from "@bimmerz/ibus";
import { WRITEABLE_OBC_PROPERTY } from "../types";
import { Logger } from "@bimmerz/core";

export class OBCOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(ibusInterface, logger);
    }

    private set(property: WRITEABLE_OBC_PROPERTY, value: any, source: DEVICE = KNOWN_DEVICES.GraphicsNavigationDriver) {

    }
}