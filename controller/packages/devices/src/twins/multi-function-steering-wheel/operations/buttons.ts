import { DEVICE, IBusMessage, KNOWN_DEVICES, IBusInterface } from "@bimmerz/bus";
import { Logger } from "@bimmerz/core";
import { buildMultiFunctionSteeringWheelButtonPress, MULTI_FUNCTION_STEERING_WHEEL_BUTTON, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE } from "@bimmerz/commands";
import { DeviceOperations } from "../../../devices";

export class ButtonOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(ibusInterface, logger);
    }

    public press(button: MULTI_FUNCTION_STEERING_WHEEL_BUTTON, 
                state: MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE,
                target: DEVICE = KNOWN_DEVICES.RAD): void {        
        this.ibusInterface.sendMessage(
            buildMultiFunctionSteeringWheelButtonPress({ 
                button, 
                state, 
                target 
            })
        );        
    }
}