import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, DATA_BYTE_3_INDEX, IBusMessage, IBusMessageParser } from "@bimmerz/bus";
import { ButtonPress, MULTI_FUNCTION_STEERING_WHEEL_BUTTON, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_MASK, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE_MASK, VOLUME_CHANGE_DIRECTION, VolumeChange } from "./types";
import { KNOWN_COMMANDS, ParserRegistry, validateCommand } from "../../types";

export type MultiFunctionSteeringWheelButtonPressParser = IBusMessageParser<ButtonPress>;

export function parseMultiFunctionSteeringWheelButtonPress(message: IBusMessage): ButtonPress {
    validateCommand(KNOWN_COMMANDS.BUTTON_PRESS, message);

    const button = (message.payload[DATA_BYTE_1_INDEX] & MULTI_FUNCTION_STEERING_WHEEL_BUTTON_MASK) as MULTI_FUNCTION_STEERING_WHEEL_BUTTON;
    const state = (message.payload[DATA_BYTE_1_INDEX] & MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE_MASK) as MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE;
    const press = {
        button,
        state
    }
    
    return press;
}

export type MultiFuncionSteeringWheelVolumeChangeParser = IBusMessageParser<VolumeChange>;

export function parseMultiFuncionSteeringWheelVolumeChange(message: IBusMessage): VolumeChange {
    validateCommand(KNOWN_COMMANDS.VOLUME_BUTTON_PRESS, message);

    const direction = (message.payload[DATA_BYTE_1_INDEX] & 0x01) as VOLUME_CHANGE_DIRECTION;
    const steps = message.payload[DATA_BYTE_1_INDEX] >> 4;
    const volumeChange = {
        direction,
        steps
    };

    return volumeChange;
}    

export type MflParsedCommandTypes = {
    [KNOWN_COMMANDS.BUTTON_PRESS]: ButtonPress;
    [KNOWN_COMMANDS.VOLUME_BUTTON_PRESS]: VolumeChange;
};

export const MFL_COMMAND_PARSERS: ParserRegistry<MflParsedCommandTypes> = {
    [KNOWN_COMMANDS.BUTTON_PRESS]: parseMultiFunctionSteeringWheelButtonPress,
    [KNOWN_COMMANDS.VOLUME_BUTTON_PRESS]: parseMultiFuncionSteeringWheelVolumeChange
} as const;