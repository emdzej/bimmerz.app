import { IBusMessage, KNOWN_DEVICES, IBusInterface } from "@bimmerz/bus";
import { DeviceTwin } from "../device-twin";
import { CDChangerEvents } from "./events";
import { Logger } from "@bimmerz/core";
import { KNOWN_COMMANDS } from "@bimmerz/commands";


export class CDChanger extends DeviceTwin<CDChangerEvents> {
    
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.CDCD, 'CDChanger', ibusInterface, logger);
        this.handle(KNOWN_COMMANDS.MODULE_STATUS_RESPONSE, (message) => this.handleStatusResponse(message));
    }

    private handleStatusResponse(message: IBusMessage): void {
        this.log.debug(message, "Handling status response");
        // const status: MODULE_STATUS = message.payload[0]  
        if (message.source === this.deviceAddress) {      
            this.log.debug("CD changer said it is present");
            this.isPresent = true;
        }
        if (message.destination === this.deviceAddress) {
            this.log.debug(`${message.source} said to CD it is present`);
        }
    }
    
    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.isPresent = true;
        this.emit("moduleStatusResponse", { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.emit("moduleStatusRequest", { source: message.source, destination: message.destination });
    }
}

