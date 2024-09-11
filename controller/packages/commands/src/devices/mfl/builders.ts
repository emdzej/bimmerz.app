import { IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { KNOWN_COMMANDS } from "../../types";
import { ButtonPressArgs, VolumeChangeArgs } from "./types";

export type MultiFunctionSteeringWheelButtonPressBuilder = IBusMessageBuilder<ButtonPressArgs>;

export function buildMultiFunctionSteeringWheelButtonPress(
    { button, state, target = KNOWN_DEVICES.RAD }: ButtonPressArgs): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.BUTTON_PRESS,
        button | state
    ];
    const message = {
        source: KNOWN_DEVICES.MFL,
        destination: target,
        payload
    }
    return message;
}

export type MultiFunctionSteeringWheelVolumeChangeBuilder = IBusMessageBuilder<VolumeChangeArgs>;

export function buildMultiFunctionSteeringWheelVolumeChange(
    { direction, steps, target = KNOWN_DEVICES.RAD }: VolumeChangeArgs): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.VOLUME_BUTTON_PRESS,
        direction | (steps << 4)
    ];
    const message = {
        source: KNOWN_DEVICES.MFL,
        destination: target,
        payload
    }
    return message;
}
