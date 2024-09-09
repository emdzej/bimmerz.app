import { DEVICE } from "@bimmerz/bus";
import { DeviceOperations } from "./device-operations";

export type DeviceEvent = {
    source: DEVICE;
    destination: DEVICE;
}

export type DeviceEventHandler<T> = (event: T) => void; 

export type DeviceEvents = {
    moduleStatusRequest: DeviceEvent;
    moduleStatusResponse: DeviceEvent;
};
