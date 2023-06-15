import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, IBusMessage, KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { DeviceTwin } from "../device-twin";
import logger, {  } from 'pino';
import { IBusInterface } from "@bimmerz/ibus-core";
import { RainLightSensorEvents } from "./events";
import { DeviceEventHandler } from "../types";
import { LIGHTS_REQUIRED_STATUS, LIGHT_RAIN_SENSOR_STATUS, RAIN_LIGHT_SENSOR_COMMANDS } from "./types";

export declare interface RainLightSensor  {    
    on<K extends keyof RainLightSensorEvents>(name: K, listener: DeviceEventHandler<RainLightSensorEvents[K]>): this;
    emit<K extends keyof RainLightSensorEvents>(name: K, event: RainLightSensorEvents[K]): boolean;    
}

export class RainLightSensor extends DeviceTwin {
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

    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.RAIN_LIGHT_SENSOR, 'Rain Light Sensor', ibusInterface, logger({ name: 'Rain Light Sensor', level: 'debug' }));            
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
}

