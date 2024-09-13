import { DEVICE, IBusInterface, KNOWN_DEVICE, KNOWN_DEVICES } from "@bimmerz/bus";
import { buildInstrumentClusterIgnitionStatusRequest, buildInstrumentClusterSensorsStatusRequest, WRITEABLE_OBC_PROPERTY } from "@bimmerz/commands";

import { Logger } from "@bimmerz/core";
import { DeviceOperations } from "../../../devices";

export class SensorsOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(ibusInterface, logger);
    }

    public requestSensorsStatus(source: DEVICE): void {
        this.ibusInterface.sendMessage(
            buildInstrumentClusterSensorsStatusRequest(source)
        );
    }
    
}