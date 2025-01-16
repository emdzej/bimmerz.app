import { COMMAND_INDEX, IBusMessage } from "@bimmerz/bus";
import { getKeyByValue } from "@bimmerz/core";


// /*Messages*/
// const unsigned char DSREQ = 0x01;/*"Device status request"*/
// const unsigned char DSRED = 0x02;/*"Device status ready"*/
// const unsigned char BSREQ = 0x03;/*"Bus status request"*/
// const unsigned char BS = 0x04;/*"Bus status"*/
// const unsigned char DRM = 0x06;/*"DIAG read memory"*/
// const unsigned char DWM = 0x07;/*"DIAG write memory"*/
// const unsigned char DRCD = 0x08;/*"DIAG read coding data"*/
// const unsigned char DWCD = 0x09;/*"DIAG write coding data"*/
// const unsigned char VC = 0x0C;/*"Vehicle control"*/

// const unsigned char ISREQ = 0x10;/*"Ignition status request"*/
// const unsigned char IS = 0x11;/*"Ignition status"*/
// const unsigned char ISSREQ = 0x12;/*"IKE sensor status request"*/
// const unsigned char ISS = 0x13;/*"IKE sensor status"*/
// const unsigned char CCSREQ = 0x14;/*"Country coding status request"*/
// const unsigned char CCS = 0x15;/*"Country coding status"*/
// const unsigned char OREQ = 0x16;/*"Odometer request"*/
// const unsigned char O = 0x17;/*"Odometer"*/
// const unsigned char SR = 0x18;/*"Speed/RPM"*/
// const unsigned char T = 0x19;/*"Temperature"*/
// const unsigned char ITDG = 0x1A;/*"IKE text display/Gong"*/
// const unsigned char ITS = 0x1B;/*"IKE text status"*/

// const unsigned char TREQ = 0x1D;/*"Temperature request"*/
// const unsigned char UTAD = 0x1F;/*"UTC time and date"*/

// const unsigned char MT = 0x21; /*Radio Short cuts*/
// const unsigned char TDC = 0x22; /*Text display confirmation*/
// const unsigned char UMID = 0x23;/*"Display Text"*/
// const unsigned char UANZV = 0x24;/*"Update ANZV"*/
// const unsigned char OBCSU = 0x2A;/*"On-Board Computer State Update"*/

// const unsigned char MFLB = 0x32;/*"MFL buttons"*/
// const unsigned char DSPEB = 0x34;/*"DSP Equalizer Button"*/
// const unsigned char CDSREQ = 0x38;/*"CD status request"*/
// const unsigned char CDS = 0x39;/*"CD status"*/
// const unsigned char MFLB2 = 0x3B;/*"MFL buttons"*/
// const unsigned char SDRSSREQ = 0x3D;/*"SDRS status request"*/
// const unsigned char SDRSS = 0x3E;/*"SDRS status"*/

// const unsigned char SOBCD = 0x40;/*"Set On-Board Computer Data"*/
// const unsigned char OBCDR = 0x41;/*"On-Board Computer Data Request"*/
// const unsigned char LCDC = 0x46;/* LCD Clear*/
// const unsigned char BMBTB0 = 0x47;/*"BMBT buttons"*/
// const unsigned char BMBTB1 = 0x48;/*"BMBT buttons"*/
// const unsigned char KNOB = 0x49;/*"KNOB button"*/ /*this is for right knob turn, pressing know is BMBTB1 and ButtonMenuKnob*/
// const unsigned char CC = 0x4a;/*Cassette control*/
// const unsigned char CS = 0x4b;/*"Cassette Status"*/
// const unsigned char RGBC = 0x4F;/*"RGB Control"*/

// const unsigned char VDREQ = 0x53;/*"Vehicle data request"*/
// const unsigned char VDS = 0x54;/*"Vehicle data status"*/
// const unsigned char LSREQ = 0x5A;/*"Lamp status request"*/
// const unsigned char LS = 0x5B;/*"Lamp Status"*/
// const unsigned char ICLS = 0x5C;/*"Instrument cluster lighting status"*/

// const unsigned char RSSREQ = 0x71;/*"Rain sensor status request"*/
// const unsigned char RKB = 0x72;/*"Remote Key buttons"*/
// const unsigned char EWSKS = 0x74;/*"EWS key status"*/
// const unsigned char DWSREQ = 0x79;/*"Doors/windows status request"*/
// const unsigned char DWS = 0x7A;/*"Doors/windows status"*/
// const unsigned char SHDS = 0x7C;/*"SHD status"*/

// const unsigned char RCL = 0xD4; /*RDS channel list*/

// const unsigned char CPAT = 0xA2;/*"Current position and time*/
// const unsigned char CL = 0xA4;/*Current location, always 23 bytes, data has 2 byte order number and then ascii: 00 01 4F 55 4C 55 00 == 1st packet, OULU\0*/
// const unsigned char ST = 0xa5; /*Screen text*/
// const unsigned char TMCSREQ = 0xA7;/*"TMC status request"*/

/*
2025-01-07 10:55:27.020	3B 05 68 4E 01 00 19	GT	RAD	Audio source selection	

*/
export const KNOWN_COMMANDS = {
    NC: 0xAA,
    REQUEST_IDENTITY: 0x00,    
    MODULE_STATUS_REQUEST: 0x01,
    MODULE_STATUS_RESPONSE: 0x02,
    READ_FAULT_CODES: 0x04,
    CLEAR_FAULT_CODES: 0x05,
    READ_MEMORY: 0x06,
    WRITE_MEMORY: 0x07,    
    
    READ_CODING_DATA: 0x08,    
    WRITE_CODING_DATA: 0x09,
    GET_IO_STATUS: 0x0B,
    VC: 0x0C,
    
    IGNITION_STATUS_REQUEST: 0x10,
    IGNITION_STATUS_RESPONSE: 0x11,
    SENSORS_STATUS_REQUEST: 0x12,
    SENSORS_STATUS_RESPONSE: 0x13,
    VEHICLE_CONFIG_RESPONSE: 0x15,
    ODOMETER_REQUEST: 0x16,
    ODOMETER_UPDATE: 0x17,
    SPEED_RPM_UPDATE: 0x18,
    TEMP_UPDATE: 0x19,
    G: 0x1C,
    TEMP_REQUEST: 0x1D,
    GPS_TIME: 0x1F,
    RADIO_SHORTCUTS: 0x21,
    CONFIRM_TEXT_DISPLAY: 0x22,
    DISPLAY_TEXT: 0x23,
    UPDATE_ANZV: 0x24,
    OBC_STATE_UPDATE: 0x2A,
    OBC_PROPERTY_UPDATE: 0x24,
    TELEPHONE_LEDS: 0x2B,
    VOLUME_BUTTON_PRESS: 0x32,    
    BUTTON_PRESS: 0x3B,
    CDC_CONTROL: 0x38,
    CDC_STATUS: 0x39,
    OBC_PROPERTY_SET_REQUEST: 0x40,
    CLEAR_LCD: 0x46,
    BOARD_MONITOR_SOFT_BUTTON_PRESS: 0x47,
    BOARD_MONITOR_BUTTON_PRESS: 0x48,
    BOARD_MONITOR_NAV_DIALOG: 0x49,
    BOARD_MONITOR_CONTROL: 0x4F,
    CHECK_CONTROL_STATUS: 0x51,
    REDUNDANT_DATA_REQUEST: 0x53,
    REDUNDANT_DATA_RESPONSE: 0x54,
    CLUSTER_BUTTONS: 0x57,    
    LIGHT_RAIN_SENSOR_STATUS: 0x59,
    LIGHT_STATUS_REQUEST: 0x5A,
    LIGHT_STATUS_RESPONSE: 0x5B,
    DIMMER_STATUS: 0x5C,
    DIMMER_STATUS_REQUEST: 0x5D,
    LIGHT_RAIN_SENSOR_STATUS_REQUEST: 0x71,
    IMMOBILISER_STATUS_REQUEST: 0x73,
    WIPER_STATUS_REQUEST: 0x75,
    VISUAL_INDICATOR_STATUS: 0x76,
    DOOR_LID_STATUS_REQUEST: 0x79,
    DOOR_LID_STATUS_RESPONSE: 0x7A,   
    AC_STATUS_UNVERIFIED: 0x83, 
    DIAGNOSTIC_KEEP_ALIVE: 0x9E,
    TERMINATE_DIAGNOSTIC: 0x9F,
    // PDC    
    PDC_SENSOR_REQUEST: 0x1B,    
    DD: 0xA0,    
    DIAGNOSTIC_PARAMETER_ERROR: 0xB0,
    TI: 0x2B,
    CURRENT_POSITION: 0xA2,
    CURRENT_LOCATION: 0xA4,

    
} as const;

export const KNOWN_COMMAND_NAMES: Partial<Record<keyof typeof KNOWN_COMMANDS, string>> = {
    G: "Gong",
    VC: "Vehicle Control",
    DD: "Diagnostic Data",
    TI: "Telephone Indicators",
    NC: "Navigation Control",
} as const;


/*

CD

	CD status Req		Radio	CD player	68	05	18	38	00	00
Veified	Stop		Radio	CD player	68	05	18	38	01	00
Verified	Pause		Radio	CD player	68	05	18	38	02	00
Veified	Play		Radio	CD player	68	05	18	38	03	00
Veified	Fast Rwd		Radio	CD player	68	05	18	38	04	00
Veified	Fast Fwd		Radio	CD player	68	05	18	38	04	01
										
Verified	CD Button 1		Radio	CD player	68	05	18	38	06	01
Verified	CD Button 2		Radio	CD player	68	05	18	38	06	02
Verified	CD Button 3		Radio	CD player	68	05	18	38	06	03
Verified	CD Button 4		Radio	CD player	68	05	18	38	06	04
Verified	CD Button 5		Radio	CD player	68	05	18	38	06	05
Verified	CD Button 6		Radio	CD player	68	05	18	38	06	06
										
Verified	Scan On		Radio	CD player	68	05	18	38	07	01
Verified	Scan Off		Radio	CD player	68	05	18	38	07	00
										
Verified	Random On		Radio	CD player	68	05	18	38	08	01
Verified	Random Off		Radio	CD player	68	05	18	38	08	00

*/
export type KNWON_COMMAND = typeof KNOWN_COMMANDS[keyof typeof KNOWN_COMMANDS];

export type COMMAND = KNWON_COMMAND | number;

export function validateCommand(expectedCommand: COMMAND, message: IBusMessage): void {
    const actualCommand = message.payload[COMMAND_INDEX];
    if (actualCommand !== expectedCommand) {
        throw new Error(`Expected command ${expectedCommand} but got ${actualCommand}`);
    }
}

export function getCommandName(command: COMMAND): string {
    return getKeyByValue(KNOWN_COMMANDS, command) || command.toString(16);
}