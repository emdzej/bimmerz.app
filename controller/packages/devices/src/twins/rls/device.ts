import { IBusInterface, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { DeviceTwin } from "../device-twin";
import { RainLightSensorEvents } from "./events";
import { Logger } from "@bimmerz/core";
import { KNOWN_COMMANDS, LIGHTS_REQUIRED_STATUS, LIGHT_RAIN_SENSOR_STATUS, parseRainLightSensorStatus } from "@bimmerz/commands";

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
        super(KNOWN_DEVICES.RLS, 'Rain Light Sensor', ibusInterface, logger);
        this.handle(KNOWN_COMMANDS.LIGHT_RAIN_SENSOR_STATUS, (message) => this.handleSensorStatus(message));   
    }

    private handleSensorStatus(message: IBusMessage): void {
        const { status, lightsRequired, intensity } = parseRainLightSensorStatus(message);
        
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

