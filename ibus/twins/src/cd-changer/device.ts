import { KNOWN_DEVICE, KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { DeviceTwin } from "../device-twin";
import { IBusMessage, IBusMessageHandler } from "@bimmerz/ibus-core";
import logger, { Logger, LoggerOptions } from 'pino';
import { COMMAND_INDEX } from "@bimmerz/ibus-core";
import { COMMANDS as COMMON_COMMANDS, MODULE_STATUS } from "../types";
import { IBusInterface } from "@bimmerz/ibus-core";
import { DeviceEventHandler, DeviceEvents } from "../types";
import { CDChangerEvents } from "./events";



export declare interface CDChanger  {    
    on<K extends keyof CDChangerEvents>(name: K, listener: DeviceEventHandler<CDChangerEvents[K]>): this;
    emit<K extends keyof CDChangerEvents>(name: K, event: CDChangerEvents[K]): boolean;    
}

export class CDChanger extends DeviceTwin {
    
    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.CDChangerDINsize, 'CDChanger', ibusInterface, logger({ name: 'CDChanger', level: 'debug' }));        
        this.handle(COMMON_COMMANDS.MODULE_STATUS_RESPONE, (message) => this.handleStatusResponse(message));
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
}

