import { KNOWN_DEVICES } from "../../devices";
import { DeviceTwin } from "../device-twin";
import { IBusMessage, IBusMessageHandler } from "types";
import logger, { Logger, LoggerOptions } from 'pino';
import { COMMAND_INDEX, DATA_BYTE_2_INDEX } from "../../protocol";
import { COMMAND as COMMON_COMMANDS } from "../commands";
import { IBusInterface } from "../../interface";
import { DeviceEvents, DeviceEvent, DeviceEventHandler } from "twins/types";
import { MultiFuncionSteeringWheelEvents } from "./events";
import { MULTI_FUNCTION_STEERING_WHEEL_COMMANDS, MULTI_FUNCTION_STEERING_WHEEL_BUTTON, VOLUME_CHANGE_DIRECTION } from "./types";

export declare interface MultiFuncionSteeringWheel  {    
    on<K extends keyof MultiFuncionSteeringWheelEvents>(name: K, listener: DeviceEventHandler<MultiFuncionSteeringWheelEvents[K]>): this;
    emit<K extends keyof MultiFuncionSteeringWheelEvents>(name: K, event: MultiFuncionSteeringWheelEvents[K]): boolean;    
}

export class MultiFuncionSteeringWheel extends DeviceTwin {
    
    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.BodyModule, 'Multi Function Steering Wheel', ibusInterface, logger({ name: 'MultiFuncionSteeringWheel' }));
        this.registerHandler(MULTI_FUNCTION_STEERING_WHEEL_COMMANDS.BUTTON_PRESS, (message) => this.handleButtonPress(message));
        this.registerHandler(MULTI_FUNCTION_STEERING_WHEEL_COMMANDS.VOLUME_BUTTON_PRESS, (message) => this.handleVolumeChange(message));        
    }
    
    private handleButtonPress(message: IBusMessage): void {
        const button = message.payload[DATA_BYTE_2_INDEX] as MULTI_FUNCTION_STEERING_WHEEL_BUTTON;
        this.log.debug({ button }, "Handling button press");
        this.emit('keyPress', { button });
    }

    private handleVolumeChange(message: IBusMessage): void {
        const direction = (message.payload[DATA_BYTE_2_INDEX] & 0x01) as VOLUME_CHANGE_DIRECTION;
        const steps = message.payload[DATA_BYTE_2_INDEX] >> 4;

        this.log.debug({ direction, steps }, "Handling volume change");
        this.emit('volumeChange', { direction, steps });
    }    
}

