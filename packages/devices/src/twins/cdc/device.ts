import { IBusMessage, KNOWN_DEVICES, IBusInterface, KNOWN_DEVICE_NAMES } from "@bimmerz/bus";
import { BaseDeviceActions, DeviceTwin } from "../device-twin";
import { CDChangerEvents } from "./events";
import { Logger } from "@bimmerz/core";
import { BuilderArgumentParserRegistry, BuilderRegistry, KNOWN_COMMANDS } from "@bimmerz/commands";
import { CdcBuiltCommandArgsTypes } from "@bimmerz/commands/src/devices/cdc";


type CDCActions = BaseDeviceActions & {
    [K in keyof CdcBuiltCommandArgsTypes]: CdcBuiltCommandArgsTypes[K];
}

export class CDC extends DeviceTwin<CDChangerEvents, CDCActions> {
        
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.CDC, KNOWN_DEVICE_NAMES.CDC, ibusInterface, logger);        
    }

    public get actions(): { requestStatus: string; announce: string; reportPresence: string; reportStatus: string; } {
        return {
            requestStatus: 'requestStatus',
            announce: 'announce',
            reportPresence: 'reportPresence',
            reportStatus: 'reportStatus',
        };
    }

    protected get actionBuilders(): BuilderRegistry<CDCActions> {
        return {
            ...this.baseDeviceActionBuilders,
        };    
    }

    protected get actionArgsParsers(): BuilderArgumentParserRegistry<CDCActions> {
        return {
            ...this.baseDeviceActionArgsParsers,
        };
    }

    protected handleIdentityRequest(message: IBusMessage): void {
        this.emit('identityRequest', { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.defaultModuleStatusRequestHandler(message);
        this.emit('statusResponse', { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.defaultStatusResponseHandler();
        this.emit('statusRequest', { source: message.source, destination: message.destination });
    }
}

