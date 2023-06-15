import { DeviceOperations } from "../../types";
import logger from 'pino';
import { DEVICE, IBusMessage, KNOWN_DEVICE, KNOWN_DEVICES, IBusInterface} from "@bimmerz/ibus";
import { MULTI_FUNCTION_STEERING_WHEEL_COMMANDS, MULTI_FUNCTION_STEERING_WHEEL_BUTTON, VOLUME_CHANGE_DIRECTION, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_MASK, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE_MASK, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE } from "../types";

export class VolumeOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface) {
        super(ibusInterface, logger({ name: 'VolumeOperations', level: 'debug' }));
    }

    public changeVolume(direction: VOLUME_CHANGE_DIRECTION, steps: number = 0x01, target: DEVICE = KNOWN_DEVICES.RADIO): void {
        const payload = Buffer.from([
            MULTI_FUNCTION_STEERING_WHEEL_COMMANDS.VOLUME_BUTTON_PRESS,
            direction | (steps << 4)
        ])
        const message: IBusMessage = {
            source: KNOWN_DEVICES.MultiFunctionSteeringWheel,
            destination: target,
            payload
        };
        this.ibusInterface.sendMessage(message);
    }
}