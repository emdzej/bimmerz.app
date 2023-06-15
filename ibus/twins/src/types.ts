import { DEVICE, IBusInterface } from "@bimmerz/ibus-core";
import { Logger, LoggerOptions } from "pino";

export type DeviceEvent = {
    source: DEVICE;
    destination: DEVICE;
}

export type DeviceEventHandler<T> = (event: T) => void; 

export type DeviceEvents = {
    moduleStatusRequest: DeviceEvent;
    moduleStatusResponse: DeviceEvent;
};

export const MODULE_STATUS_REQUEST_EVENT = 'moduleStatusRequest';
export const MODULE_STATUS_RESPONSE_EVENT = 'moduleStatusResponse';

export abstract class DeviceOperations {
    protected readonly ibusInterface: IBusInterface;
    protected readonly log: Logger<LoggerOptions>;

    constructor(ibusInterface: IBusInterface, log: Logger<LoggerOptions>) {
        this.ibusInterface = ibusInterface;
        this.log = log;
    }
}