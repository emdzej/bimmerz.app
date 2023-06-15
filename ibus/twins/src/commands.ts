export const COMMANDS = {
    MODULE_STATUS_REQUEST: 0x01,
    MODULE_STATUS_RESPONE: 0x02
} as const;

export type COMMAND = typeof COMMANDS[keyof typeof COMMANDS];

export const MODULE_STATUSES = {
    MODULE_NOT_PRESENT: 0x00,
    MODULE_PRESENT: 0x01
} as const;

export type MODULE_STATUS = typeof MODULE_STATUSES[keyof typeof MODULE_STATUSES];
