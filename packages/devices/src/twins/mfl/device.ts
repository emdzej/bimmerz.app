import { KNOWN_DEVICES, IBusInterface, IBusMessage, KNOWN_DEVICE_NAMES } from "@bimmerz/bus";
import { BaseDeviceActions, DeviceTwin } from "../device-twin";
import { MultiFuncionSteeringWheelEvents } from "./events";

import { Logger } from "@bimmerz/core";
import { BuilderArgumentParserRegistry, BuilderRegistry, KNOWN_COMMANDS, MFL_ARGUMENT_PARSERS, MFL_COMMAND_BUILDERS, MflBuiltCommandArgsTypes, MflParsedCommandTypes, parseMultiFuncionSteeringWheelVolumeChange, parseMultiFunctionSteeringWheelButtonPress } from "@bimmerz/commands";

export type MflActions = BaseDeviceActions & {
    [K in keyof MflBuiltCommandArgsTypes]: MflBuiltCommandArgsTypes[K];
}

export class MFL extends DeviceTwin<
    MultiFuncionSteeringWheelEvents,
    MflActions
    > {

    public get actions(): { requestStatus: string; announce: string; reportPresence: string; reportStatus: string; pressButton: string; changeVolume: string; } {
        return {
            requestStatus: 'requestStatus',
            announce: 'announce',
            reportPresence: 'reportPresence',
            reportStatus: 'reportStatus',
            pressButton: 'pressButton',
            changeVolume: 'changeVolume'
        };
    }        

    protected get actionBuilders(): BuilderRegistry<MflActions> {
        return {
            ...this.baseDeviceActionBuilders,
            ...MFL_COMMAND_BUILDERS
        };
    }

    protected get actionArgsParsers(): BuilderArgumentParserRegistry<MflActions> {
        return {
            ...this.baseDeviceActionArgsParsers,
            ...MFL_ARGUMENT_PARSERS
        };
    }
  
    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.defaultModuleStatusRequestHandler(message);
        this.emit('statusResponse', { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.defaultStatusResponseHandler();
        this.emit('statusRequest', { source: message.source, destination: message.destination });
    }
        
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.MFL, KNOWN_DEVICE_NAMES["MFL"], ibusInterface, logger);
        this.handle(KNOWN_COMMANDS.BUTTON_PRESS, (message) => this.handleButtonPress(message));
        this.handle(KNOWN_COMMANDS.VOLUME_BUTTON_PRESS, (message) => this.handleVolumeChange(message));        
    }
    
    protected handleIdentityRequest(message: IBusMessage): void {
        this.emit('identityRequest', { source: message.source, destination: message.destination });
    }

    private handleButtonPress(message: IBusMessage): void {
        const { button, state } = parseMultiFunctionSteeringWheelButtonPress(message);        
        this.emit('button', { button, state });
    }

    private handleVolumeChange(message: IBusMessage): void {
        const { direction, steps } = parseMultiFuncionSteeringWheelVolumeChange(message);        
        this.emit('volumeChange', { direction, steps });
    }    
}

