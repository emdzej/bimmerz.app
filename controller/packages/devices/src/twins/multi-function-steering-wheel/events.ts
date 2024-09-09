import { VOLUME_CHANGE_DIRECTION, MULTI_FUNCTION_STEERING_WHEEL_BUTTON, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE } from "@bimmerz/commands";
import { DeviceEvents } from "../../devices";


export type VolumeChangeEvent = {
    direction: VOLUME_CHANGE_DIRECTION;
    steps: number;
}

export type ButtonEvent = {
    button: MULTI_FUNCTION_STEERING_WHEEL_BUTTON;
    state: MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE;
};


export type MultiFuncionSteeringWheelEvents = DeviceEvents & {
    volumeChange: VolumeChangeEvent;
    button: ButtonEvent;
}
