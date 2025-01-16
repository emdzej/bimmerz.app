import { DEVICE, KNOWN_DEVICES, IBusInterface, IBusMessage, KNOWN_DEVICE_NAMES } from "@bimmerz/bus";
import { BaseDeviceActions, DeviceTwin } from "../device-twin";
import { InstrumentClusterEvents } from "./events";
import { Logger } from "@bimmerz/core";
import { AUX_VENT_STATUSES, BRAKE_PADS_STATUSES, buildInstrumentClusterRedundantDataRequest, DRIVER_DOOR_STATUSES, ENGINE_STATUSES, GEARS, HANDBRAKE_STATUSES, IGNITION_STATUS, IGNITION_STATUSES, KNOWN_COMMANDS, OBC_PROPERTIES, OBCProperties, OIL_PRESSURE_STATUSES, parseInstrumentClusterIgnitionStatusResponse, parseInstrumentClusterOdometerResponse, parseInstrumentClusterRedundantDataResponse, parseInstrumentClusterSensorStatusResponse, parseInstrumentClusterSpeedRpmResponse, parseInstrumentClusterTemperatureResponse, parseInstrumentClusterVehicleConfigResponse, parseInstrumetnClusterObcPropertyUpdate, VehicleData, SensorsStatus, Temperatures, TRANSMISSION_STATUSES, VEHICLE_TYPE, BuilderArgumentParserRegistry, BuilderRegistry, IKE_COMMAND_BUILDERS, IKE_COMMAND_PARSERS } from "@bimmerz/commands";

type IKEActions = BaseDeviceActions & {

};

export class IKE extends DeviceTwin<InstrumentClusterEvents, IKEActions> {
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

    private _ignitionStatus: IGNITION_STATUS = IGNITION_STATUSES.OFF;

    public get ignitionStatus(): Readonly<IGNITION_STATUS> {
        return this._ignitionStatus;
    }

    private _sensorsStatus: SensorsStatus = {
        handbrake: HANDBRAKE_STATUSES.OFF,
        oilPressure: OIL_PRESSURE_STATUSES.OK,
        brakePads: BRAKE_PADS_STATUSES.OK,
        transmission: TRANSMISSION_STATUSES.OK,
        engine: ENGINE_STATUSES.OFF,
        driverDoor: DRIVER_DOOR_STATUSES.CLOSED,
        gear: GEARS.NONE,
        auxVent: AUX_VENT_STATUSES.OFF
    }

    public get sensorsStatus(): Readonly<SensorsStatus> {
        return this._sensorsStatus;
    }

    private _vehicleType?: VEHICLE_TYPE;

    public get vehicleType(): VEHICLE_TYPE | undefined {
        return this._vehicleType;
    }

    private _temperatures: Temperatures = {};

    public get temperatures(): Readonly<Temperatures> {
        return this._temperatures;
    }

    private _speed?: number;

    public get speed(): number | undefined {
        return this._speed;
    }

    private _rpm?: number;

    public get rpm(): number | undefined {
        return this._rpm;
    }

    private _odometer?: number;

    public get odometer(): number | undefined {
        return this._odometer;
    }

    private _obcProperties: OBCProperties = {};

    public get obcProperties(): Readonly<OBCProperties> {
        return this._obcProperties;
    }

    private _vehicleData: VehicleData = {};

    public get vehicleData(): Readonly<VehicleData> {
        return this._vehicleData;
    }

    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.IKE, KNOWN_DEVICE_NAMES.IKE, ibusInterface, logger);
        this.handle(KNOWN_COMMANDS.IGNITION_STATUS_REQUEST, (message) => this.handleIgnitionStatusRequest(message));
        this.handle(KNOWN_COMMANDS.IGNITION_STATUS_RESPONSE, (message) => this.handleIgnitionStatusResponse(message));
        this.handle(KNOWN_COMMANDS.SENSORS_STATUS_REQUEST, (message) => this.handleSensorsStatusRequest(message));
        this.handle(KNOWN_COMMANDS.SENSORS_STATUS_RESPONSE, (message) => this.handleSensorsStatusResponse(message));
        this.handle(KNOWN_COMMANDS.VEHICLE_CONFIG_RESPONSE, (message) => this.handleVehicleConfigResponse(message));
        this.handle(KNOWN_COMMANDS.TEMP_UPDATE, (message) => this.handleTempUpdate(message));
        this.handle(KNOWN_COMMANDS.SPEED_RPM_UPDATE, (message) => this.handleSpeedRpmUpdate(message));
        this.handle(KNOWN_COMMANDS.ODOMETER_UPDATE, (message) => this.handleOdometerUpdate(message));
        this.handle(KNOWN_COMMANDS.OBC_PROPERTY_UPDATE, (message) => this.handleOBCPropertyUpdate(message));
        this.handle(KNOWN_COMMANDS.REDUNDANT_DATA_REQUEST, (message) => this.handleRedundantDataRequest(message));
        this.handle(KNOWN_COMMANDS.REDUNDANT_DATA_RESPONSE, (message) => this.handleRedundantDataResponse(message));
    }

    public requestRedundantData(source: DEVICE = KNOWN_DEVICES.LCM): void {
        this.ibusInterface.sendMessage(
            buildInstrumentClusterRedundantDataRequest(source)
        );        
    }

    private handleRedundantDataRequest(message: IBusMessage): void {
        this.emit('redundantDataRequest', {
            source: message.source,
            destination: message.destination,
        });
    }
    
    private handleRedundantDataResponse(message: IBusMessage): void {
        this._vehicleData = parseInstrumentClusterRedundantDataResponse(message);        
        this.emit('redundantDataResponse', { vehicleData: this._vehicleData }); 
    }
        
    

    private handleIgnitionStatusRequest(message: IBusMessage): void {
        this.emit('ignitionStatusRequest', {
            source: message.source,
            destination: message.destination,
        });
    }

    private handleIgnitionStatusResponse(message: IBusMessage): void {
        this._ignitionStatus = parseInstrumentClusterIgnitionStatusResponse(message);        
        this.emit('ignitionStatusChange', {
            status: this._ignitionStatus
        });
    }



    private handleSensorsStatusRequest(message: IBusMessage): void {
        this.emit('sensorsStatusRequest', {
            source: message.source,
            destination: message.destination,
        });
    }

    private handleSensorsStatusResponse(message: IBusMessage): void {
        this._sensorsStatus = parseInstrumentClusterSensorStatusResponse(message);
        this.emit('sensorsStatusChange', { status: this._sensorsStatus });
    }

    private handleVehicleConfigResponse(message: IBusMessage): void {
        this._vehicleType = parseInstrumentClusterVehicleConfigResponse(message);        
        this.emit('vehicleTypeUpdate', { vehicleType: this._vehicleType });
    }

    private handleTempUpdate(message: IBusMessage): void {
        this._temperatures = parseInstrumentClusterTemperatureResponse(message);        
        this.emit('temperaturesUpdate', { temperatures : this._temperatures });
    }

    private handleSpeedRpmUpdate(message: IBusMessage): void {
        const { speed, rpm } = parseInstrumentClusterSpeedRpmResponse(message);        
        this._speed = speed;
        this._rpm = rpm;
        this.emit('speedRpmChange', { speed, rpm });
    }

    private handleOdometerUpdate(message: IBusMessage): void {
        this._odometer = parseInstrumentClusterOdometerResponse(message);        
        this.emit('odometerChange', { odometer: this._odometer });
    }

    private handleOBCPropertyUpdate(message: IBusMessage): void {
        const { property, value } = parseInstrumetnClusterObcPropertyUpdate(message);        
        switch (property) {
            case OBC_PROPERTIES.TIME: this._obcProperties.time = value; break;
            case OBC_PROPERTIES.DATE: this._obcProperties.date = value; break;
            case OBC_PROPERTIES.TEMPERATURE: this._obcProperties.temperature = value; break;
            case OBC_PROPERTIES.CONSUMPTION_1: this._obcProperties.consumption1 = value; break;
            case OBC_PROPERTIES.CONSUMPTION_2: this._obcProperties.consumption2 = value; break;
            case OBC_PROPERTIES.RANGE: this._obcProperties.range = value; break;
            case OBC_PROPERTIES.DISTANCE: this._obcProperties.distance = value; break;
            case OBC_PROPERTIES.ARRIVAL: this._obcProperties.arrival = value; break;
            case OBC_PROPERTIES.LIMIT: this._obcProperties.limit = value; break;
            case OBC_PROPERTIES.AVERAGE_SPEED: this._obcProperties.averageSpeed = value; break;
            case OBC_PROPERTIES.TIMER: this._obcProperties.timer = value; break;
            case OBC_PROPERTIES.AUX_TIMER_1: this._obcProperties.auxTimer1 = value; break;
            case OBC_PROPERTIES.AUX_TIMER_2: this._obcProperties.auxTimer2 = value; break;
            case OBC_PROPERTIES.CODE_EMERGENCY_DEACTIVATION: this._obcProperties.codeEmergencyDeactivation = value; break;
            case OBC_PROPERTIES.TIMER_LAP: this._obcProperties.timerLap = value; break;
        }  
        this.emit('obcPropertiesChange', { obcProperties: this._obcProperties });
    }

  
}

