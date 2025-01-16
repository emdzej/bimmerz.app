import { KNOWN_DEVICES, IBusInterface, IBusMessage } from "@bimmerz/bus";
import { BaseDeviceActions, DeviceTwin } from "../device-twin";
import { RadioEvents } from "./events";
import { Logger } from "@bimmerz/core";
import { BuilderRegistry, BuilderArgumentParserRegistry } from "@bimmerz/commands";

type RADActions = BaseDeviceActions & {
};
export class RAD extends DeviceTwin<RadioEvents, RADActions> {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.RAD, 'Radio', ibusInterface, logger);
    }

    public get actions(): { requestStatus: string; announce: string; reportPresence: string; reportStatus: string; } {
        return {
            requestStatus: 'requestStatus',
            announce: 'announce',
            reportPresence: 'reportPresence',
            reportStatus: 'reportStatus',
        };
    }

    protected get actionBuilders(): BuilderRegistry<BaseDeviceActions> {
        return {
            ...this.baseDeviceActionBuilders            
        };
    }

    protected get actionArgsParsers(): BuilderArgumentParserRegistry<BaseDeviceActions> {
        return {
            ...this.baseDeviceActionArgsParsers            
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

