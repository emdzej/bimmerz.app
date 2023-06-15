import { DeviceOperations } from "../../types";
import logger from 'pino';
import { DEVICE, IBusMessage, KNOWN_DEVICE, KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { IBusInterface } from "@bimmerz/ibus-core";
import { WRITEABLE_OBC_PROPERTY } from "../types";

export class OBCOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface) {
        super(ibusInterface, logger({ name: 'OBCOperations', level: 'debug' }));
    }

    private set(property: WRITEABLE_OBC_PROPERTY, value: any, source: DEVICE = KNOWN_DEVICES.GraphicsNavigationDriver) {

    }
}