import { IBusInterface } from "@bimmerz/bus";
import { Logger } from "@bimmerz/core";

export const MODULE_STATUS_REQUEST_EVENT = 'moduleStatusRequest';
export const MODULE_STATUS_RESPONSE_EVENT = 'moduleStatusResponse';
 
export abstract class DeviceOperations {
    protected readonly ibusInterface: IBusInterface;
    protected readonly log: Logger;

    constructor(ibusInterface: IBusInterface, log: Logger) {
        this.ibusInterface = ibusInterface;
        this.log = log;
    }
}


export type DeviceOperationsCategory = "status";

export type DeviceOperationsRegistry<T extends DeviceOperationsCategory, O extends DeviceOperations> = Record<T, Record<string, O>>;

