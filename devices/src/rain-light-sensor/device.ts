import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, IBusInterface, IBusMessage, KNOWN_DEVICES } from "@bimmerz/ibus";
import { DeviceTwin } from "../device-twin";
import { RainLightSensorEvents } from "./events";
import { LIGHTS_REQUIRED_STATUS, LIGHT_RAIN_SENSOR_STATUS, RAIN_LIGHT_SENSOR_COMMANDS } from "./types";
import { Logger } from "@bimmerz/core";
export class RainLightSensor extends DeviceTwin<RainLightSensorEvents> {
    private _intensity?: number;
    private _lightsRequired?: LIGHTS_REQUIRED_STATUS;
    private _status?: LIGHT_RAIN_SENSOR_STATUS;

    public get intensity(): number | undefined {
        return this._intensity;
    }

    public get lightsRequired(): LIGHTS_REQUIRED_STATUS | undefined {
        return this._lightsRequired;
    }

    public get status(): LIGHT_RAIN_SENSOR_STATUS | undefined {
        return this._status;
    }

    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.RAIN_LIGHT_SENSOR, 'Rain Light Sensor', ibusInterface, logger);
        this.handle(RAIN_LIGHT_SENSOR_COMMANDS.SENSOR_STATUS, (message) => this.handleSensorStatus(message));   
    }

    private handleSensorStatus(message: IBusMessage): void {
        const status = message.payload[DATA_BYTE_1_INDEX] as LIGHT_RAIN_SENSOR_STATUS;
        const lightsRequired = (message.payload[DATA_BYTE_2_INDEX] & 0x01) as LIGHTS_REQUIRED_STATUS;
        const intensity = message.payload[DATA_BYTE_2_INDEX] >> 4;
        this._intensity = intensity;
        this._lightsRequired = lightsRequired;
        this._status = status;
        this.emit('status', { status, lightsRequired, intensity });
    }

    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.isPresent = true;
        this.emit("moduleStatusResponse", { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.emit("moduleStatusRequest", { source: message.source, destination: message.destination });
    }
}

