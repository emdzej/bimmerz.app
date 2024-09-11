import { DEVICE, IBusInterface, KNOWN_DEVICES } from "@bimmerz/bus";
import { buildStatusRequest, buildStatusResponse, MODULE_STATUS, MODULE_STATUSES } from "@bimmerz/commands";

import { Logger } from "@bimmerz/core";
import { DeviceOperations } from "../../../devices";

export class StatusOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(ibusInterface, logger);
    }
    
    public requestStatus(source: DEVICE, target: DEVICE = KNOWN_DEVICES.GLO): void {        
        this.ibusInterface.sendMessage(buildStatusRequest(source, target));
    }

    public announce(source: DEVICE, target: DEVICE = KNOWN_DEVICES.GLO): void {
        this.reportStatus(source, MODULE_STATUSES.MODULE_ANNOUNCE, target);
    }

    public reportPresence(source: DEVICE, target: DEVICE = KNOWN_DEVICES.GLO): void {
        this.reportStatus(source, MODULE_STATUSES.MODULE_PRESENT, target);
    }

    public reportStatus(source: DEVICE, status: MODULE_STATUS, target: DEVICE = KNOWN_DEVICES.GLO): void {
        this.ibusInterface.sendMessage(
            buildStatusResponse(source, target, status)
        );        
    };    
}