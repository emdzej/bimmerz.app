import { LIGHTS_REQUIRED_STATUS, LIGHT_RAIN_SENSOR_STATUS } from "@bimmerz/commands";
import { DeviceEvents } from "../../devices";

export type RainLightSensorStatusEvent = {
    intensity?: number;
    lightsRequired: LIGHTS_REQUIRED_STATUS;
    status: LIGHT_RAIN_SENSOR_STATUS;
}

export type RainLightSensorEvents = DeviceEvents & {
    status: RainLightSensorStatusEvent;
}