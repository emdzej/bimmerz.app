import { DEVICE, IBusInterface, KNOWN_DEVICE, KNOWN_DEVICES } from "@bimmerz/bus";
import { buildInstrumentClusterIgnitionStatusRequest, buildInstrumentClusterIgnitionStatusResponse, IGNITION_STATUS, WRITEABLE_OBC_PROPERTY } from "@bimmerz/commands";

import { Logger } from "@bimmerz/core";
import { DeviceOperations } from "../../../devices";

export class IgnitionOparations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(ibusInterface, logger);
    }

    public requestIgnitionStatus(source: DEVICE): void {
        this.ibusInterface.sendMessage(
            buildInstrumentClusterIgnitionStatusRequest(source)
        );        
    }

    public reportIgnitionStatus(status: IGNITION_STATUS, target: DEVICE = KNOWN_DEVICES.GLOBAL_BROADCAST): void {
        this.ibusInterface.sendMessage(
            buildInstrumentClusterIgnitionStatusResponse({status, target})
        );
    }
}