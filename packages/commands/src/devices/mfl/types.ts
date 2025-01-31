import { DEVICE } from "@bimmerz/bus";

export const VOLUME_CHANGE_DIRECTIONS = {
    DOWN: 0x00,
    UP: 0x01
} as const;

export type VOLUME_CHANGE_DIRECTION = typeof VOLUME_CHANGE_DIRECTIONS[keyof typeof VOLUME_CHANGE_DIRECTIONS];


/*
BUTTON_FORWARD  = 0b0000_0001   # 0x01
BUTTON_BACK     = 0b0000_1000   # 0x08

BUTTON_RT       = 0b0100_0000   # 0x40
BUTTON_TEL      = 0b1000_0000   # 0x80
State 0b0011_0000

STATE_PRESS     = 0b0000_0000   # 0x00
STATE_HOLD      = 0b0001_0000   # 0x10
STATE_RELEASE   = 0b0010_0000   # 0x20
*/

export const MULTI_FUNCTION_STEERING_WHEEL_BUTTONS = {
    FORWARD: 0x01,
    BACK: 0x08,
    RT: 0x40,
    TEL: 0x80
} as const;

export const MULTI_FUNCTION_STEERING_WHEEL_BUTTON_MASK = 0xC9;

export type MULTI_FUNCTION_STEERING_WHEEL_BUTTON = typeof MULTI_FUNCTION_STEERING_WHEEL_BUTTONS[keyof typeof MULTI_FUNCTION_STEERING_WHEEL_BUTTONS];

export const MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATES = {
    PRESS: 0x00,
    HOLD: 0x10,
    RELEASE: 0x20
} as const;

export const MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE_MASK = 0x30;

export type MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE = typeof MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATES[keyof typeof MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATES];

export type ButtonPress = {
    button: MULTI_FUNCTION_STEERING_WHEEL_BUTTON;
    state: MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE;
}

export type ButtonPressArgs = ButtonPress & {    
    target: DEVICE
}

export type VolumeChange = {
    direction: VOLUME_CHANGE_DIRECTION;
    steps: number;
}

export type VolumeChangeArgs = VolumeChange & {
    target: DEVICE
}