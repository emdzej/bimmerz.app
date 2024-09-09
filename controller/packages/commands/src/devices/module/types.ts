
export const MODULE_STATUSES = {
    MODULE_PRESENT: 0x00,
    MODULE_ANNOUNCE: 0x01
} as const;

export type MODULE_STATUS = typeof MODULE_STATUSES[keyof typeof MODULE_STATUSES];

