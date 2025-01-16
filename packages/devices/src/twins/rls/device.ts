import { IBusInterface, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { BaseDeviceActions, DeviceTwin, DeviceTwinStatus } from "../device-twin";
import { RainLightSensorEvents } from "./events";
import { Logger } from "@bimmerz/core";
import { BuilderArgumentParserRegistry, BuilderRegistry, IKE_COMMAND_BUILDERS, KNOWN_COMMANDS, LIGHTS_REQUIRED_STATUS, LIGHT_RAIN_SENSOR_STATUS, parseRainLightSensorStatus } from "@bimmerz/commands";

export type RLSStatus = DeviceTwinStatus & {
    intensity?: number;
    lightsRequired?: LIGHTS_REQUIRED_STATUS;
    sensorStatus?: LIGHT_RAIN_SENSOR_STATUS;
}

type RLSActions = BaseDeviceActions & {
};

export class RLS extends DeviceTwin<RainLightSensorEvents, RLSActions, RLSStatus> {
    private _intensity?: number;
    private _lightsRequired?: LIGHTS_REQUIRED_STATUS;
    private _sensorStatus?: LIGHT_RAIN_SENSOR_STATUS;

    override get status(): RLSStatus {
        return {
            ...super.status,
            intensity: this._intensity,
            lightsRequired: this._lightsRequired,
            sensorStatus: this._sensorStatus
        };
    }
    
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.RLS, 'Rain Light Sensor', ibusInterface, logger);
        this.handle(KNOWN_COMMANDS.LIGHT_RAIN_SENSOR_STATUS, (message) => this.handleSensorStatus(message));   
    }

    private handleSensorStatus(message: IBusMessage): void {
        const { status, lightsRequired, intensity } = parseRainLightSensorStatus(message);
        
        this._intensity = intensity;
        this._lightsRequired = lightsRequired;
        this._sensorStatus = status;
        this.emit('status', { status, lightsRequired, intensity });
    }

    public get actions(): { requestStatus: string; announce: string; reportPresence: string; reportStatus: string; } {
        return {
            requestStatus: 'requestStatus',
            announce: 'announce',
            reportPresence: 'reportPresence',
            reportStatus: 'reportStatus',
        };
    }

    protected get actionBuilders(): BuilderRegistry<BaseDeviceActions> {
        return {
            ...this.baseDeviceActionBuilders,
            ...IKE_COMMAND_BUILDERS
        };
    }

    protected get actionArgsParsers(): BuilderArgumentParserRegistry<BaseDeviceActions> {
        return {
            ...this.baseDeviceActionArgsParsers            
        };
    }

    protected handleIdentityRequest(message: IBusMessage): void {
        this.emit('identityRequest', { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.defaultModuleStatusRequestHandler(message);
        this.emit('statusResponse', { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.defaultStatusResponseHandler();
        this.emit('statusRequest', { source: message.source, destination: message.destination });
    }
}

