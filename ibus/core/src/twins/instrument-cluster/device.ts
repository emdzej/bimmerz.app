import { DEVICE, KNOWN_DEVICE, KNOWN_DEVICES } from "../../devices";
import { IBusMessage, IBusMessageHandler } from "types";
import logger, { Logger, LoggerOptions } from 'pino';
import { COMMAND_INDEX, DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, DATA_BYTE_3_INDEX } from "../../protocol";
import { COMMANDS as COMMON_COMMANDS } from "../commands";
import { IBusInterface } from "../../interface";
import { DeviceEvent, DeviceEvents, DeviceEventHandler } from "twins/types";
import { AUX_VENT_STATUS, AUX_VENT_STATUSES, BRAKE_PADS_STATUS, BRAKE_PADS_STATUSES, DRIVER_DOOR_STATUS, DRIVER_DOOR_STATUSES, DeviceTwin, ENGINE_STATUS, ENGINE_STATUSES, GEAR, GEARS, HANDBRAKE_STATUS, HANDBRAKE_STATUSES, IGNITION_STATUS, IGNITION_STATUSES, INSTRUMENT_CLUSTER_COMMANDS, InstrumentClusterEvents, OBCProperties, OBC_PROPERTIES, OBC_PROPERTY, OIL_PRESSURE_STATUS, OIL_PRESSURE_STATUSES, SensorsStatus, TRANSMISSION_STATUS, TRANSMISSION_STATUSES, Temperatures, VEHICLE_TYPE, VEHICLE_TYPES, WRITEABLE_OBC_PROPERITES } from "twins";


export declare interface InstrumentCluster  {    
    on<K extends keyof InstrumentClusterEvents>(name: K, listener: DeviceEventHandler<InstrumentClusterEvents[K]>): this;
    emit<K extends keyof InstrumentClusterEvents>(name: K, event: InstrumentClusterEvents[K]): boolean;    
}


export class InstrumentCluster extends DeviceTwin {
    private ignitionStatus: IGNITION_STATUS = IGNITION_STATUSES.OFF;
    private sensorsStatus: SensorsStatus = {
        handbrake: HANDBRAKE_STATUSES.OFF,
        oilPressure: OIL_PRESSURE_STATUSES.OK,
        brakePads: BRAKE_PADS_STATUSES.OK,
        transmission: TRANSMISSION_STATUSES.OK,
        engine: ENGINE_STATUSES.OFF,
        driverDoor: DRIVER_DOOR_STATUSES.CLOSED,
        gear: GEARS.NONE,
        auxVent: AUX_VENT_STATUSES.OFF
    }
    private vehicleType?: VEHICLE_TYPE;
    private temperatures: Temperatures = {};
    private speed?: number;
    private rpm?: number;
    private odometer?: number;
    private obcProperties: OBCProperties = {};

    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.InstrumentClusterElectronics, 'InstrumentCluster', ibusInterface, logger({ name: 'InstrumentCluster', level: 'debug' }));               
        this.registerHandler(INSTRUMENT_CLUSTER_COMMANDS.IGNITION_STATUS_REQUEST, (message) => this.handleIgnitionStatusRequest(message));
        this.registerHandler(INSTRUMENT_CLUSTER_COMMANDS.IGNITION_STATUS_RESPONSE, (message) => this.handleIgnitionStatusResponse(message));
        this.registerHandler(INSTRUMENT_CLUSTER_COMMANDS.SENSORS_STATUS_REQUEST, (message) => this.handleSensorsStatusRequest(message));
        this.registerHandler(INSTRUMENT_CLUSTER_COMMANDS.SENSORS_STATUS_RESPONSE, (message) => this.handleSensorsStatusResponse(message));
        this.registerHandler(INSTRUMENT_CLUSTER_COMMANDS.VEHICLE_CONFIG_RESPONSE, (message) => this.handleVehicleConfigResponse(message));
        this.registerHandler(INSTRUMENT_CLUSTER_COMMANDS.TEMP_UPDATE, (message) => this.handleTempUpdate(message));
        this.registerHandler(INSTRUMENT_CLUSTER_COMMANDS.SPEED_RPM_UPDATE, (message) => this.handleSpeedRpmUpdate(message));
        this.registerHandler(INSTRUMENT_CLUSTER_COMMANDS.ODOMETER_UPDATE, (message) => this.handleOdometerUpdate(message));
        this.registerHandler(INSTRUMENT_CLUSTER_COMMANDS.OBC_PROPERTY_UPDATE, (message) => this.handleOBCPropertyUpdate(message));
    }
    
        
    public requestIgnitionStatus(source: DEVICE): void {
        const payload = Buffer.alloc(1);
        payload[0] = INSTRUMENT_CLUSTER_COMMANDS.IGNITION_STATUS_REQUEST;
        const message = {
            source: source,
            destination: this.deviceAddress,
            payload
        };
        this.ibusInterface.sendMessage(message);
    }

    private handleIgnitionStatusRequest(message: IBusMessage): void {
        this.emit('ignitionStatusRequest', {
            source: message.source,
            destination: message.destination,
        });
    }

    private handleIgnitionStatusResponse(message: IBusMessage): void {
        const status = message.payload[DATA_BYTE_1_INDEX] as IGNITION_STATUS;
        this.ignitionStatus = status;
        this.emit('ignitionStatusChange', {
            status: status,
        });
    }

    public requestSensorsStatus(source: DEVICE): void {
        const payload = Buffer.alloc(1);
        payload[0] = INSTRUMENT_CLUSTER_COMMANDS.SENSORS_STATUS_REQUEST;
        const message = {
            source: source,
            destination: this.deviceAddress,
            payload
        };
        this.ibusInterface.sendMessage(message);
    }

    private handleSensorsStatusRequest(message: IBusMessage): void {
        this.emit('sensorsStatusRequest', {
            source: message.source,
            destination: message.destination,
        });
    }

    private handleSensorsStatusResponse(message: IBusMessage): void {
        const firstByte = message.payload[DATA_BYTE_1_INDEX];
        const secondByte = message.payload[DATA_BYTE_2_INDEX];
        const thirdByte = message.payload[DATA_BYTE_3_INDEX];
 
        const handbrake = (firstByte & 0b0000_0001) as HANDBRAKE_STATUS;
        const oilPressure = (firstByte & 0b0000_0010) as OIL_PRESSURE_STATUS;
        const brakePads = (firstByte & 0b0000_0100) as BRAKE_PADS_STATUS;
        const transmission = (firstByte >> 4) as TRANSMISSION_STATUS;
        const engine = (secondByte & 0b0000_0001) as ENGINE_STATUS;
        const driverDoor = (secondByte & 0b0000_0010) as DRIVER_DOOR_STATUS;
        const gear =(secondByte >> 4) as GEAR;
        const auxVent = (thirdByte >> 3) as AUX_VENT_STATUS;

        const status: SensorsStatus = {
            handbrake,
            oilPressure,
            brakePads,
            transmission,
            engine,
            driverDoor,
            gear,
            auxVent
        };

        this.sensorsStatus = status;

        this.emit('sensorsStatusChange', { status });
    }

    private handleVehicleConfigResponse(message: IBusMessage): void {
        const reportedType = (message.payload[DATA_BYTE_1_INDEX] >> 4) & 0xF;
        var detectedVehicleType: VEHICLE_TYPE;
        if (reportedType == 0x0F || reportedType == 0x0A) {
            detectedVehicleType = VEHICLE_TYPES.E46_Z4;
        } else {            
            detectedVehicleType = VEHICLE_TYPES.E38_E39_E53;
        }
        this.vehicleType = detectedVehicleType;
        this.emit('vehicleTypeUpdate', { vehicleType: detectedVehicleType });
    }

    private handleTempUpdate(message: IBusMessage): void {
        const coolantTemp = message.payload[DATA_BYTE_2_INDEX];
        const ambientTemp = message.payload.readInt8(DATA_BYTE_1_INDEX);
        const temperatures = {
            coolant: coolantTemp,
            ambient: ambientTemp
        };
        this.temperatures = temperatures;
        this.emit('temperaturesUpdate', { temperatures });
    }

    private handleSpeedRpmUpdate(message: IBusMessage): void {
        const speed = message.payload[DATA_BYTE_1_INDEX] * 2;
        const rpm = message.payload[DATA_BYTE_2_INDEX] * 100;
        this.speed = speed;
        this.rpm = rpm;
        this.emit('speedRpmChange', { speed, rpm });
    }

    private handleOdometerUpdate(message: IBusMessage): void {
        const odometer =  message.payload.readUInt8(DATA_BYTE_3_INDEX) << 16
            + message.payload.readUInt8(DATA_BYTE_2_INDEX) << 8
            + message.payload.readUInt8(DATA_BYTE_1_INDEX);
        this.odometer = odometer;
        this.emit('odometerChange', { odometer });
    }

    private handleOBCPropertyUpdate(message: IBusMessage): void {
        const property  = message.payload[DATA_BYTE_1_INDEX] as OBC_PROPERTY;
        const rawValue = message.payload.subarray(DATA_BYTE_3_INDEX).toString();
        switch (property) {
            case OBC_PROPERTIES.TIME: this.obcProperties.time = rawValue; break;
            case OBC_PROPERTIES.DATE: this.obcProperties.date = rawValue; break;
            case OBC_PROPERTIES.TEMPERATURE: this.obcProperties.temperature = rawValue; break;
            case OBC_PROPERTIES.CONSUMPTION_1: this.obcProperties.consumption1 = rawValue; break;
            case OBC_PROPERTIES.CONSUMPTION_2: this.obcProperties.consumption2 = rawValue; break;
            case OBC_PROPERTIES.RANGE: this.obcProperties.range = rawValue; break;
            case OBC_PROPERTIES.DISTANCE: this.obcProperties.distance = rawValue; break;
            case OBC_PROPERTIES.ARRIVAL: this.obcProperties.arrival = rawValue; break;
            case OBC_PROPERTIES.LIMIT: this.obcProperties.limit = rawValue; break;
            case OBC_PROPERTIES.AVERAGE_SPEED: this.obcProperties.averageSpeed = rawValue; break;
            case OBC_PROPERTIES.TIMER: this.obcProperties.timer = rawValue; break;
            case OBC_PROPERTIES.AUX_TIMER_1: this.obcProperties.auxTimer1 = rawValue; break;
            case OBC_PROPERTIES.AUX_TIMER_2: this.obcProperties.auxTimer2 = rawValue; break;
            case OBC_PROPERTIES.CODE_EMERGENCY_DEACTIVATION: this.obcProperties.codeEmergencyDeactivation = rawValue; break;
            case OBC_PROPERTIES.TIMER_LAP: this.obcProperties.timerLap = rawValue; break;
        }  
        this.emit('obcPropertiesChange', { obcProperties: this.obcProperties });
    }

    private setObcProperty(property: WRITEABLE_OBC_PROPERITES, value: any, source: DEVICE = KNOWN_DEVICES.GraphicsNavigationDriver) {

    }
}

