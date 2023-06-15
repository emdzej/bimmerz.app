import { DATA_BYTE_1_INDEX, KNOWN_DEVICES, IBusInterface, IBusMessage } from "@bimmerz/ibus";
import { DeviceTwin } from "../device-twin";
import logger, {  } from 'pino';
import { DeviceEventHandler } from "../types";
import { MultiFuncionSteeringWheelEvents } from "./events";
import { MULTI_FUNCTION_STEERING_WHEEL_COMMANDS, MULTI_FUNCTION_STEERING_WHEEL_BUTTON, VOLUME_CHANGE_DIRECTION, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_MASK, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE_MASK, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE } from "./types";

export declare interface MultiFuncionSteeringWheel  {    
    on<K extends keyof MultiFuncionSteeringWheelEvents>(name: K, listener: DeviceEventHandler<MultiFuncionSteeringWheelEvents[K]>): this;
    emit<K extends keyof MultiFuncionSteeringWheelEvents>(name: K, event: MultiFuncionSteeringWheelEvents[K]): boolean;    
}

export class MultiFuncionSteeringWheel extends DeviceTwin {
    
    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.BODY_MODULE, 'Multi Function Steering Wheel', ibusInterface, logger({ name: 'MultiFuncionSteeringWheel' }));
        this.handle(MULTI_FUNCTION_STEERING_WHEEL_COMMANDS.BUTTON_PRESS, (message) => this.handleButtonPress(message));
        this.handle(MULTI_FUNCTION_STEERING_WHEEL_COMMANDS.VOLUME_BUTTON_PRESS, (message) => this.handleVolumeChange(message));        
    }
    
    private handleButtonPress(message: IBusMessage): void {
        const button = (message.payload[DATA_BYTE_1_INDEX] & MULTI_FUNCTION_STEERING_WHEEL_BUTTON_MASK) as MULTI_FUNCTION_STEERING_WHEEL_BUTTON;
        const state = (message.payload[DATA_BYTE_1_INDEX] & MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE_MASK) as MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE;
        this.log.debug({ button }, "Handling button press");
        this.emit('button', { button, state });
    }

    private handleVolumeChange(message: IBusMessage): void {
        const direction = (message.payload[DATA_BYTE_1_INDEX] & 0x01) as VOLUME_CHANGE_DIRECTION;
        const steps = message.payload[DATA_BYTE_1_INDEX] >> 4;

        this.log.debug({ direction, steps }, "Handling volume change");
        this.emit('volumeChange', { direction, steps });
    }    
}

