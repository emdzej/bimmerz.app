import { DEVICE } from "@bimmerz/ibus";


export const LIGHT_RAIN_SENSOR_STATUSES = {
    UNKNOWN: 0x00,
    TWILIGHT: 0x01,
    DARKNESS: 0x02,
    RAIN: 0x04,
    TUNNEL: 0x08,
    BASEMENT_GARAGE: 0x10
} as const;

export type LIGHT_RAIN_SENSOR_STATUS = typeof LIGHT_RAIN_SENSOR_STATUSES[keyof typeof LIGHT_RAIN_SENSOR_STATUSES];

export const LIGHTS_REQUIRED_STATUSES = {
    NOT_REQUIRED: 0x00,
    REQUIRED: 0x01
} as const;

export type LIGHTS_REQUIRED_STATUS = typeof LIGHTS_REQUIRED_STATUSES[keyof typeof LIGHTS_REQUIRED_STATUSES];

export type RainLightSensorStatus = {
    intensity?: number;
    lightsRequired?: LIGHTS_REQUIRED_STATUS;
    status?: LIGHT_RAIN_SENSOR_STATUS;
}