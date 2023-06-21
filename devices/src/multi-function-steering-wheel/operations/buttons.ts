import { DeviceOperations } from "../../types";
import { DEVICE, IBusMessage, KNOWN_DEVICE, KNOWN_DEVICES, IBusInterface } from "@bimmerz/ibus";
import { MULTI_FUNCTION_STEERING_WHEEL_BUTTON, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE, MULTI_FUNCTION_STEERING_WHEEL_COMMANDS } from "../types";
import { Logger } from "@bimmerz/core";

export class ButtonOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(ibusInterface, logger);
    }

    public press(button: MULTI_FUNCTION_STEERING_WHEEL_BUTTON, 
                state: MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE,
                target: DEVICE = KNOWN_DEVICES.RADIO): void {
        const payload = Buffer.from([
            MULTI_FUNCTION_STEERING_WHEEL_COMMANDS.BUTTON_PRESS,
            button | state
        ])
        const message: IBusMessage = {
            source: KNOWN_DEVICES.MultiFunctionSteeringWheel,
            destination: target,
            payload
        };
        this.ibusInterface.sendMessage(message);
    }
}