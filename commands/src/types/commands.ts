import { COMMAND_INDEX, IBusMessage } from "@bimmerz/ibus";

export const COMMANDS = {
    MODULE_STATUS_REQUEST: 0x01,
    MODULE_STATUS_RESPONE: 0x02,
    DIAGNOSTIC_REQUEST: 0x0C,
    DIAGNOSTIC_RESPONSE: 0xA0,    
    IGNITION_STATUS_REQUEST: 0x10,
    IGNITION_STATUS_RESPONSE: 0x11,
    SENSORS_STATUS_REQUEST: 0x12,
    SENSORS_STATUS_RESPONSE: 0x13,
    VEHICLE_CONFIG_RESPONSE: 0x15,
    ODOMETER_UPDATE: 0x17,
    SPEED_RPM_UPDATE: 0x18,
    TEMP_UPDATE: 0x19,
    OBC_PROPERTY_UPDATE: 0x24,
    BUTTON_PRESS: 0x3B,
    VOLUME_BUTTON_PRESS: 0x32,
    OBC_PROPERTY_SET_REQUEST: 0x40,
    REDUNDANT_DATA_REQUEST: 0x53,
    REDUNDANT_DATA_RESPONSE: 0x54,
    LIGHT_RAIN_SENSOR_STATUS: 0x59,
    LIGHT_STATUS_REQUEST: 0x5A,
    LIGHT_STATUS_RESPONSE: 0x5B,
    DIMMER_STATUS: 0x5C,
    DOOR_LID_STATUS_REQUEST: 0x79,
    DOOR_LID_STATUS_RESPONSE: 0x7A,    
} as const;

export type COMMAND = typeof COMMANDS[keyof typeof COMMANDS];


export function validateCommand(expectedCommand: COMMAND, message: IBusMessage): void {
    const actualCommand = message.payload[COMMAND_INDEX];
    if (actualCommand !== expectedCommand) {
        throw new Error(`Expected command ${expectedCommand} but got ${actualCommand}`);
    }
}