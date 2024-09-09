import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, DATA_BYTE_3_INDEX, IBusMessage, IBusMessageParser } from "@bimmerz/bus";

import { KNOWN_COMMANDS, validateCommand } from "../../types";
import { RainLightSensorStatus, LIGHT_RAIN_SENSOR_STATUS, LIGHTS_REQUIRED_STATUS } from "./types";

export type RainLightSensorStatusParser = IBusMessageParser<RainLightSensorStatus>;

export function parseRainLightSensorStatus(message: IBusMessage): RainLightSensorStatus {
    validateCommand(KNOWN_COMMANDS.LIGHT_RAIN_SENSOR_STATUS, message);

    const status = message.payload[DATA_BYTE_1_INDEX] as LIGHT_RAIN_SENSOR_STATUS;
    const lightsRequired = (message.payload[DATA_BYTE_2_INDEX] & 0x01) as LIGHTS_REQUIRED_STATUS;
    const intensity = message.payload[DATA_BYTE_2_INDEX] >> 4;
    const result = {
        intensity,
        lightsRequired,
        status
    };
    return result;
}
