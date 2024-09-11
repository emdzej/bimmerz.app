import { DEVICE } from "@bimmerz/bus";

export type DisplayTextArgs = {
    text: string;
    source?: DEVICE;
}

export const CD53_DISPLAY_TEXT_LENGTH = 11;
export const BLANK_CHAR = 0x9D;