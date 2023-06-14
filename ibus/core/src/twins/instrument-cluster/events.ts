import { DeviceEvent, DeviceEvents } from "twins/types";
import { IGNITION_STATUS, SensorsStatus, VEHICLE_TYPE, Temperatures, OBCProperties } from "./types";

export type IgnitionStatusEvent = {
    status: IGNITION_STATUS;
}

export type IgnitionStatusRequestedEvent = DeviceEvent;

export type SensorsStatusRequestedEvent = DeviceEvent;

export type IgnitionStatusChangedEvent = {
    status: IGNITION_STATUS;
}



export type SensorsStatusChangedEvent = {
    status: SensorsStatus;
}



export type VehicleTypeUpdatedEvent = {
    vehicleType: VEHICLE_TYPE;
}


export type TemperaturesUpdatedEvent = {
    temperatures: Temperatures;
}

export type SpeedRpmUpdatedEvent = {
    speed?: number;
    rpm?: number;
}

export type OdometerUpdateEvent =  {
    odometer?: number;
}



export type OBCPropertiesUpdatedEvent = {
    obcProperties: OBCProperties;
}

export type InstrumentClusterEvents = DeviceEvents & {
    ignitionStatusRequest: DeviceEvent;
    ignitionStatusChange: IgnitionStatusChangedEvent
    sensorsStatusRequest: DeviceEvent;
    sensorsStatusChange: SensorsStatusChangedEvent;
    vehicleTypeUpdate: VehicleTypeUpdatedEvent;
    temperaturesUpdate: TemperaturesUpdatedEvent;
    speedRpmChange: SpeedRpmUpdatedEvent;
    odometerChange: OdometerUpdateEvent;
    obcPropertiesChange: OBCPropertiesUpdatedEvent;
}