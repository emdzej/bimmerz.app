export const INSTRUMENT_CLUSTER_COMMANDS = {
    IGNITION_STATUS_REQUEST: 0x10,
    IGNITION_STATUS_RESPONSE: 0x11,
    SENSORS_STATUS_REQUEST: 0x12,
    SENSORS_STATUS_RESPONSE: 0x13,
    VEHICLE_CONFIG_RESPONSE: 0x15,
    ODOMETER_UPDATE: 0x17,
    SPEED_RPM_UPDATE: 0x18,
    TEMP_UPDATE: 0x19,
    OBC_PROPERTY_UPDATE: 0x24,
    OBC_PROPERTY_SET_REQUEST: 0x40,
    REDUNDANT_DATA_REQUEST: 0x53,
    REDUNDANT_DATA_RESPONSE: 0x54
} as const;

export type INSTRUMENT_CLUSTER_COMMAND = typeof INSTRUMENT_CLUSTER_COMMANDS[keyof typeof INSTRUMENT_CLUSTER_COMMANDS];

export const IGNITION_STATUSES = {
    OFF: 0x00, //   # Key Position 0
    KL_R: 0x01, //   # Key Position 1
    KL_15: 0x03, //   # Key Position 2
    KL_50: 0x07, //   # Key Position 3
} as const;

export type IGNITION_STATUS = typeof IGNITION_STATUSES[keyof typeof IGNITION_STATUSES];


export const HANDBRAKE_STATUSES = {
    OFF: 0x00,
    ON: 0x01
} as const;

export type HANDBRAKE_STATUS = typeof HANDBRAKE_STATUSES[keyof typeof HANDBRAKE_STATUSES];

export const OIL_PRESSURE_STATUSES = {
    OK: 0x00,
    FAULT: 0x01
} as const;

export type OIL_PRESSURE_STATUS = typeof OIL_PRESSURE_STATUSES[keyof typeof OIL_PRESSURE_STATUSES];

export const BRAKE_PADS_STATUSES = {
    OK: 0x00,
    FAULT: 0x01
} as const;

export type BRAKE_PADS_STATUS = typeof BRAKE_PADS_STATUSES[keyof typeof BRAKE_PADS_STATUSES];

export const TRANSMISSION_STATUSES = {
    OK: 0x00,
    FAULT: 0x01
} as const;

export type TRANSMISSION_STATUS = typeof TRANSMISSION_STATUSES[keyof typeof TRANSMISSION_STATUSES];

export const ENGINE_STATUSES = {
    OFF: 0x00,
    RUNNING: 0x01
} as const;

export type ENGINE_STATUS = typeof ENGINE_STATUSES[keyof typeof ENGINE_STATUSES];

export const DRIVER_DOOR_STATUSES = {
    CLOSED: 0x00,
    OPEN: 0x01
} as const;

export type DRIVER_DOOR_STATUS = typeof DRIVER_DOOR_STATUSES[keyof typeof DRIVER_DOOR_STATUSES];

export const GEARS = {
    NONE: 0b0000_0000,
    PARK: 0b1011_0000,
    REVERSE: 0b0001_0000,
    NEUTRAL: 0b0111_0000,
    DRIVE: 0b1000_0000,
    FIRST: 0b0010_0000,
    SECOND: 0b0110_0000,
    THIRD: 0b1101_0000,
    FOURTH: 0b1100_0000,
    FIFTH: 0b1110_0000,
    SIXTH: 0b1111_0000
} as const;

export type GEAR = typeof GEARS[keyof typeof GEARS];

export const AUX_VENT_STATUSES = {
    OFF: 0x00,
    ON: 0x01
} as const;

export type AUX_VENT_STATUS = typeof AUX_VENT_STATUSES[keyof typeof AUX_VENT_STATUSES];


export type SensorsStatus = {
    handbrake: HANDBRAKE_STATUS;
    oilPressure: OIL_PRESSURE_STATUS;
    brakePads: BRAKE_PADS_STATUS;
    transmission: TRANSMISSION_STATUS;
    engine: ENGINE_STATUS;
    driverDoor: DRIVER_DOOR_STATUS;
    gear: GEAR;
    auxVent: AUX_VENT_STATUS;
};

export const VEHICLE_TYPES = {
    E38_E39_E53: 0x01,
    E46_Z4: 0x02
} as const;

export type VEHICLE_TYPE = typeof VEHICLE_TYPES[keyof typeof VEHICLE_TYPES];

export type Temperatures = {
    ambient?: number;
    coolant?: number;
};

export const OBC_PROPERTIES = {
    TIME: 0x01,
    DATE: 0x02,
    TEMPERATURE: 0x03,
    CONSUMPTION_1: 0x04,
    CONSUMPTION_2: 0x05,
    RANGE: 0x06,
    DISTANCE: 0x07,
    ARRIVAL: 0x08,
    LIMIT: 0x09,
    AVERAGE_SPEED: 0x0a,
    TIMER: 0x0e,
    AUX_TIMER_1: 0x0f,
    AUX_TIMER_2: 0x10,
    CODE_EMERGENCY_DEACTIVATION: 0x16,
    TIMER_LAP: 0x1a
} as const;

export type OBC_PROPERTY = typeof OBC_PROPERTIES[keyof typeof OBC_PROPERTIES];

export const WRITEABLE_OBC_PROPERITES = {
    TIME: 0x01,
    DATE: 0x02,
    DISTANCE: 0x07,
    LIMIT: 0x09,
    CODE: 0x0d,
    AUX_TIMER_1: 0x0f,
    AUX_TIMER_2: 0x10
} as const;

export type WRITEABLE_OBC_PROPERTY = typeof WRITEABLE_OBC_PROPERITES[keyof typeof WRITEABLE_OBC_PROPERITES];


export type OBCProperties = {
    time?: string;
    date?: string;
    temperature?: string;
    consumption1?: string;
    consumption2?: string;
    range?: string;
    distance?: string;
    arrival?: string;
    limit?: string;
    averageSpeed?: string;
    timer?: string;
    auxTimer1?: string;
    auxTimer2?: string;
    codeEmergencyDeactivation?: string;
    timerLap?: string;    
};

export type RedundantData = {
    vin?: string;
    mileage?: number;
    consumedFuel?: number;
    oilInterval?: number;
    timeInterval?: number; // days
};