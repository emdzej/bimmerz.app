import { IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { BuilderArgumentParserRegistry, BuilderRegistry, KNOWN_COMMANDS } from "../../types";
import { ButtonPressArgs, 
    MULTI_FUNCTION_STEERING_WHEEL_BUTTON,
    MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE,
    MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATES, 
    MULTI_FUNCTION_STEERING_WHEEL_BUTTONS, VOLUME_CHANGE_DIRECTIONS, VolumeChangeArgs } from "./types";
import { parseMember } from "@bimmerz/core";


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

export function parseButtonPressArgs(...args: string[]): ButtonPressArgs {
    const [target, button, state, ...rest] = args;

    if (target === undefined || button === undefined || state === undefined) {
        throw new Error("Invalid arguments");
    }

    const parsedTarget = parseMember(target, KNOWN_DEVICES);
    const parsedButton = parseMember(button, MULTI_FUNCTION_STEERING_WHEEL_BUTTONS);
    const parsedState = parseMember(state, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATES);

    if (parsedTarget === undefined || parsedButton === undefined || parsedState === undefined) {
        throw new Error("Invalid arguments");
    }

    return {
        target: parsedTarget,
        button: parsedButton,
        state: parsedState
    };
}

export function parseVolumeChangeArgs(...args: string[]): VolumeChangeArgs {
    const [target, direction, steps, ...rest] = args;
    
    if (target === undefined || direction === undefined || steps === undefined) {
        throw new Error("Invalid arguments");
    }

    const parsedTarget = parseMember(target, KNOWN_DEVICES);
    const parsedDirection = parseMember(direction, VOLUME_CHANGE_DIRECTIONS);
    const parsedSteps = parseInt(steps);

    if (parsedTarget === undefined || parsedDirection === undefined || isNaN(parsedSteps)) {
        throw new Error("Invalid arguments");
    }

    return {
        target: parsedTarget,
        direction: parsedDirection,
        steps: parsedSteps
    };
}

export type MflBuiltCommandArgsTypes = {
    pressButton: ButtonPressArgs;
    changeVolume: VolumeChangeArgs;
};

export const MFL_COMMAND_BUILDERS: BuilderRegistry<MflBuiltCommandArgsTypes> = {
    pressButton: buildMultiFunctionSteeringWheelButtonPress,
    changeVolume: buildMultiFunctionSteeringWheelVolumeChange
};

export const MFL_ARGUMENT_PARSERS: BuilderArgumentParserRegistry<MflBuiltCommandArgsTypes> = {
    pressButton: parseButtonPressArgs,
    changeVolume: parseVolumeChangeArgs
}
