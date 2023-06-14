import { type } from "os";
import { DEVICE } from "../devices";

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
