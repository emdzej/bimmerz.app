import { DeviceEvents } from "twins/types";
import { VOLUME_CHANGE_DIRECTION, MULTI_FUNCTION_STEERING_WHEEL_BUTTON } from "./types";

export type VolumeChangeEvent = {
    direction: VOLUME_CHANGE_DIRECTION;
    steps: number;
}

export type KeyPressEvent = {
    button: MULTI_FUNCTION_STEERING_WHEEL_BUTTON;
};


export type MultiFuncionSteeringWheelEvents = DeviceEvents & {
    volumeChange: VolumeChangeEvent;
    keyPress: KeyPressEvent;
}
