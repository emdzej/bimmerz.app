import { DATA_BYTE_1_INDEX, KNOWN_DEVICES, IBusInterface, IBusMessage } from "@bimmerz/bus";
import { DeviceTwin } from "../device-twin";
import { MultiFuncionSteeringWheelEvents } from "./events";

import { Logger } from "@bimmerz/core";
import { KNOWN_COMMANDS, MULTI_FUNCTION_STEERING_WHEEL_BUTTON, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_MASK, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE, MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATE_MASK, parseMultiFuncionSteeringWheelVolumeChange, parseMultiFunctionSteeringWheelButtonPress, VOLUME_CHANGE_DIRECTION } from "@bimmerz/commands";

export class MultiFuncionSteeringWheel extends DeviceTwin<MultiFuncionSteeringWheelEvents> {
    
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.BODY_MODULE, 'Multi Function Steering Wheel', ibusInterface, logger);
        this.handle(KNOWN_COMMANDS.BUTTON_PRESS, (message) => this.handleButtonPress(message));
        this.handle(KNOWN_COMMANDS.VOLUME_BUTTON_PRESS, (message) => this.handleVolumeChange(message));        
    }
    
    private handleButtonPress(message: IBusMessage): void {
        const { button, state } = parseMultiFunctionSteeringWheelButtonPress(message);        
        this.emit('button', { button, state });
    }

    private handleVolumeChange(message: IBusMessage): void {
        const { direction, steps } = parseMultiFuncionSteeringWheelVolumeChange(message);        
        this.emit('volumeChange', { direction, steps });
    }    
    
    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.isPresent = true;
        this.emit("moduleStatusResponse", { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.emit("moduleStatusRequest", { source: message.source, destination: message.destination });
    }
}

