import { DEVICE } from "@bimmerz/bus";

export type DeviceEvent = {
    source: DEVICE;
    destination: DEVICE;
}

export type DeviceEventHandler<T> = (event: T) => void; 

export type DeviceEvents = {
    statusRequest: DeviceEvent;
    statusResponse: DeviceEvent;
    identityRequest: DeviceEvent;
};
