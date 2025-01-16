export const MONITOR_POWER_STATES = {
    OFF: 0b0000_0000,
    ON: 0b0001_0000
} as const;

export const VIDEO_SOURCES = {
    NAV_GT: 0b0000_0000,
    TV: 0b0000_0001,
    VID_GT: 0b0000_0010
} as const;

export const VIDEO_ENCODINGS = {
    NTSC: 0b0000_0001,
    PAL: 0b0000_0010
} as const;

export const ASPECT_RATIONS = {
    4_3: 0b0000_0000,
    16_9: 0b0001_0000,
    ZOOM: 0b0011_0000
} as const;