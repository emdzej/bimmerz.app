export const BODY_MODULE_COMMANDS = {
    DIAGNOSTIC_REQUEST: 0x0C,
    DIAGNOSTIC_RESPONSE: 0xA0,
    DOOR_LID_STATUS_REQUEST: 0x79,
    DOOR_LID_STATUS_RESPONSE: 0x7A,
} as const;

export type BODY_MODULE_COMMAND = typeof BODY_MODULE_COMMANDS[keyof typeof BODY_MODULE_COMMANDS];

export const DIAGNOSTIC_JOBS = {
    ZKE3_GM4_CENTRAL_LOCK: 0x0B,
    ZKE3_GM4_LOCK_HIGH: 0x40,
    ZKE3_GM4_LOCK_LOW: 0x41,
    ZKE3_GM4_LOCK_ALL: 0x88,
    ZKE3_GM6_LOCK_ALL: 0x90,
    ZKE3_GM4_UNLOCK_HIGH: 0x42,
    ZKE3_GM4_UNLOCK_LOW: 0x43,
    ZKE5_CENTRAL_LOCK: 0x03,
    ZKE5_LOCK_ALL: 0x34,
    ZKE5_UNLOCK_LOW: 0x37,
    ZKE5_UNLOCK_ALL: 0x45,
    OPEN_WINDOW_DRIVER_FRONT: 0x52,
    OPEN_WINDOW_DRIVER_REAR: 0x41,
    OPEN_WINDOW_PASSENGER_FRONT: 0x54,
    OPEN_WINDOW_PASSENGER_REAR: 0x44,
    CLOSE_WINDOW_DRIVER_FRONT: 0x53,
    CLOSE_WINDOW_DRIVER_REAR: 0x42,
    CLOSE_WINDOW_PASSENGER_FRONT: 0x55,
    CLOSE_WINDOW_PASSENGER_REAR: 0x43,
    TOGGLE_SUNROOF: 0x7E,
    FOLD_MIRROR: 0x31,
    UNFOLD_MIRROR: 0x30,    
} as const;

export type DIAGNOSTIC_JOB = typeof DIAGNOSTIC_JOBS[keyof typeof DIAGNOSTIC_JOBS];

export const SIDE_MIRRORS = {
    DRIVER_SIDE: 0x01,
    PASSENGER_SIDE: 0x02,
} as const;

export type SIDE_MIRROR = typeof SIDE_MIRRORS[keyof typeof SIDE_MIRRORS];

export const BODY_MODULE_VARIANT_INDEX = 6;

export const BODY_MODULE_VARIANTS = {
   
} as const;

export const DOOR_LID_STATUSES = {
    CLOSED: 0x00,
    OPEN: 0x01,
} as const;

export type DOOR_LID_STATUS = typeof DOOR_LID_STATUSES[keyof typeof DOOR_LID_STATUSES];

export const LAMP_STATUSES = {
    OFF: 0x00,
    ON: 0x01,
} as const;

export type LAMP_STATUS = typeof LAMP_STATUSES[keyof typeof LAMP_STATUSES];

export const WINDOW_STATUSES = DOOR_LID_STATUSES;

export type WINDOW_STATUS = DOOR_LID_STATUS;

export type WindowStatuses = {
    driverFront: WINDOW_STATUS;
    passengerFront: WINDOW_STATUS;
    driverRear: WINDOW_STATUS;
    passengerRear: WINDOW_STATUS;
};

export type WindowStatusesChangedEvent = {
    statuses: WindowStatuses;
};

export const WINDOWS = {
    DRIVER_FRONT: 0x00,
    PASSENGER_FRONT: 0x01,
    DRIVER_REAR: 0x02,
    PASSENGER_REAR: 0x03,
} as const;

export type WINDOW = typeof WINDOWS[keyof typeof WINDOWS];

export const CENTRAL_LOCKING_STATUSES = {
    UNLOCKED: 0x00,
    LOCKED: 0x02,
    DOUBLE_LOCKED: 0x03,
} as const;

export type CENTRAL_LOCKING_STATUS = typeof CENTRAL_LOCKING_STATUSES[keyof typeof CENTRAL_LOCKING_STATUSES];

export type DoorLidStatuses = {
    driverFront: DOOR_LID_STATUS;
    passengerFront: DOOR_LID_STATUS;
    driverRear: DOOR_LID_STATUS;
    passengerRear: DOOR_LID_STATUS;
    frontLid: DOOR_LID_STATUS;
    rearLid: DOOR_LID_STATUS;
    bootRelease: DOOR_LID_STATUS;
    sunroof: DOOR_LID_STATUS;    
}