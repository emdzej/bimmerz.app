export const LIGHT_CONTROL_MODULE_COMMANDS = {
    DIAGNOSTIC_REQUEST: 0x0C,
    DIAGNOSTIC_RESPONSE: 0xA0, 
    REDUNDANT_DATA_REQUEST: 0x53,
    REDUNDANT_DATA_RESPONSE: 0x54,   
    LIGHT_STATUS_REQUEST: 0x5A,
    LIGHT_STATUS_RESPONSE: 0x5B,
    DIMMER_STATUS: 0x5C    
} as const;

export type LIGHT_CONTROL_MODULE_COMMAND = typeof LIGHT_CONTROL_MODULE_COMMANDS[keyof typeof LIGHT_CONTROL_MODULE_COMMANDS];

export const LIGHT_MODULE_VARIANTS = {
    LME38: 1,
    LCM: 2,
    LCM_A: 3,
    LCM_II: 4,
    LCM_III: 5,
    LCM_IV: 6,
    LSZ: 7,
    LSZ_2: 8
} as const;

export type LIGHT_MODULE_VARIANT = typeof LIGHT_MODULE_VARIANTS[keyof typeof LIGHT_MODULE_VARIANTS];


/*
TURN_RAPID        = 0b1000_0000
TURN_RIGHT        = 0b0100_0000
TURN_LEFT         = 0b0010_0000
FOG_REAR          = 0b0001_0000

FOG_FRONT         = 0b0000_1000
BEAM_HIGH         = 0b0000_0100
BEAM_LOW          = 0b0000_0010
PARKING           = 0b0000_0001
*/
export const LIGHT_STATUS_BITS = {
    TURN_RAPID: 7,
    TURN_RIGHT:6,
    TURN_LEFT: 5,
    FOG_REAR: 4,    
    FOG_FRONT: 3,
    HIGH_BEAM: 2,
    LOW_BEAM: 1,
    PARKING: 0,
} as const;

/*
CCM_LIC_PLATE     = 0b1000_0000
CCM_TURN_RIGHT    = 0b0100_0000
CCM_TURN_LEFT     = 0b0010_0000
CCM_FOG_REAR      = 0b0001_0000

CCM_FOG_FRONT     = 0b0000_1000
CCM_HIGH_BEAM     = 0b0000_0100
CCM_LOW_BEAM      = 0b0000_0010
CCM_PARKING       = 0b0000_0001
*/
export const LIGHT_CHECK_STATUS_BITS = {
    LICENSE_PLATE: 7,
    TURN_RIGHT: 6,
    TURN_LEFT: 5,
    FOG_REAR: 4,
    FOG_FRONT: 3,
    HIGH_BEAM: 2,
    LOW_BEAM: 1,
    PARKING: 0,
} as const;

export const LIGHT_STATUSES = {
    OFF: 0x00,
    ON: 0x01
} as const;

export type LIGHT_STATUS = typeof LIGHT_STATUSES[keyof typeof LIGHT_STATUSES];

export const ERROR_STATUSES = {
    OK: 0x00,
    ERROR: 0x01
} as const;

export type ERROR_STATUS = typeof ERROR_STATUSES[keyof typeof ERROR_STATUSES];

export type LigthStatus = {
    rapidBlink: LIGHT_STATUS,
    turnRight: LIGHT_STATUS,
    turnLeft: LIGHT_STATUS,
    fogRear: LIGHT_STATUS,
    fogFront: LIGHT_STATUS,
    highBeam: LIGHT_STATUS,
    lowBeam: LIGHT_STATUS,
    parking: LIGHT_STATUS,
    licensePlateCheck: ERROR_STATUS,
    turnRightCheck: ERROR_STATUS,
    turnLeftCheck: ERROR_STATUS,
    fogRearCheck: ERROR_STATUS,
    fogFrontCheck: ERROR_STATUS,
    highBeamCheck: ERROR_STATUS,
    lowBeamCheck: ERROR_STATUS,
    parkingCheck: ERROR_STATUS,
};

export const DIAGNOSTIC_INDEX_OFFSSET = 7; // 10 in entire frame

export const CODING_INDEX_OFFSET = 6; // 9 in entire frame

export const LOAD_FRONT_OFFSET = 8; // 11 in entire frame

export const DIMMER_OFFSET  = 16; // 19

export const LOAD_REAR_OFFSET = 17; //20

export const PHOTO_OFFSET = 19; // 22
// LME38 has unique mapping
export const LME38_DIMMER_OFFSET = 19; //22