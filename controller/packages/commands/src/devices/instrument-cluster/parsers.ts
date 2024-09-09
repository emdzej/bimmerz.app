import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, DATA_BYTE_3_INDEX, IBusMessage, IBusMessageParser } from "@bimmerz/bus";
import { AUX_VENT_STATUS, BRAKE_PADS_STATUS, DRIVER_DOOR_STATUS, ENGINE_STATUS, GEAR, HANDBRAKE_STATUS, IGNITION_STATUS, OBCPropertyRawUpdate, OBC_PROPERTY, OIL_PRESSURE_STATUS, RedundantData, SensorsStatus, SpeedRpm, TRANSMISSION_STATUS, Temperatures, VEHICLE_TYPE, VEHICLE_TYPES } from "./types";
import { KNOWN_COMMANDS, validateCommand } from "../../types";

export type InstrumentClusterRedundantDataResponseParser = IBusMessageParser<RedundantData>;
    
export function parseInstrumentClusterRedundantDataResponse(message: IBusMessage): RedundantData {
    validateCommand(KNOWN_COMMANDS.REDUNDANT_DATA_RESPONSE, message);

    const data = message.payload.subarray(1);
    const redundantData: RedundantData = {};
    redundantData.vin = data[0].toString() 
        + data[1].toString()
        + data[2].toString(16)
        + data[3].toString(16)
        + (data[4] >> 4).toString(16);
    redundantData.consumedFuel = data[8] * 100;
    redundantData.mileage = data[5] << 8 + data[6];
    redundantData.oilInterval = data[9] << 8 + data[10];
    redundantData.timeInterval = data[11] << 8 + data[12];
    return redundantData;
}

export type InstrumentClusterIgnitionStatusResponseParser = IBusMessageParser<IGNITION_STATUS>;

export function parseInstrumentClusterIgnitionStatusResponse(message: IBusMessage): IGNITION_STATUS {
    validateCommand(KNOWN_COMMANDS.IGNITION_STATUS_RESPONSE, message);

    return message.payload[DATA_BYTE_1_INDEX] as IGNITION_STATUS;
}

export type InstrumentClusterSensorsStatusResponseParser = IBusMessageParser<SensorsStatus>;

export function parseInstrumentClusterSensorStatusResponse(message: IBusMessage): SensorsStatus {
    validateCommand(KNOWN_COMMANDS.SENSORS_STATUS_RESPONSE, message);
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
    return status;

}

export type InstrumentClusterVehicleConfigResponseParser = IBusMessageParser<VEHICLE_TYPE>;

export function parseInstrumentClusterVehicleConfigResponse(message: IBusMessage): VEHICLE_TYPE {
    validateCommand(KNOWN_COMMANDS.VEHICLE_CONFIG_RESPONSE, message);

    const reportedType = (message.payload[DATA_BYTE_1_INDEX] >> 4) & 0xF;
    var detectedVehicleType: VEHICLE_TYPE;
    if (reportedType == 0x0F || reportedType == 0x0A) {
        detectedVehicleType = VEHICLE_TYPES.E46_Z4;
    } else {            
        detectedVehicleType = VEHICLE_TYPES.E38_E39_E53;
    }

    return detectedVehicleType;
}

export type InstrumetnClusterTemperatureResponseParser = IBusMessageParser<Temperatures>;

export function parseInstrumentClusterTemperatureResponse(message: IBusMessage): Temperatures {
    validateCommand(KNOWN_COMMANDS.TEMP_UPDATE, message);

    const coolantTemp = message.payload[DATA_BYTE_2_INDEX];
    const ambientTemp = message.payload.readInt8(DATA_BYTE_1_INDEX);
    const temperatures = {
        coolant: coolantTemp,
        ambient: ambientTemp
    };
    return temperatures;    
}

export type InstrumentClusterSpeedRpmResponseParser = IBusMessageParser<SpeedRpm>;

export function parseInstrumentClusterSpeedRpmResponse(message: IBusMessage): SpeedRpm { 
    validateCommand(KNOWN_COMMANDS.SPEED_RPM_UPDATE, message);
    const speed = message.payload[DATA_BYTE_1_INDEX] * 2;
    const rpm = message.payload[DATA_BYTE_2_INDEX] * 100;
    const speedRpm = {
        speed,
        rpm
    }
    return speedRpm;
}

export type InstrumetnClusterOdometerResponseParser = IBusMessageParser<number>;

export function parseInstrumentClusterOdometerResponse(message: IBusMessage): number {
    validateCommand(KNOWN_COMMANDS.ODOMETER_UPDATE, message);
    const odometer =  message.payload.readUInt8(DATA_BYTE_3_INDEX) << 16
        + message.payload.readUInt8(DATA_BYTE_2_INDEX) << 8
        + message.payload.readUInt8(DATA_BYTE_1_INDEX);
    return odometer;    
}

export type InstrumentClusterObcPropertyUpdateParser = IBusMessageParser<OBCPropertyRawUpdate>;

export function parseInstrumetnClusterObcPropertyUpdate(message: IBusMessage): OBCPropertyRawUpdate {
    validateCommand(KNOWN_COMMANDS.OBC_PROPERTY_UPDATE, message);
    const property  = message.payload[DATA_BYTE_1_INDEX] as OBC_PROPERTY;
    const rawValue = message.payload.subarray(DATA_BYTE_3_INDEX).toString();
    const update = {
        property,
        value: rawValue        
    }
    return update;
}
