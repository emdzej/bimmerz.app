import { KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { DeviceTwin } from "../device-twin";
import { IBusMessage, IBusMessageHandler } from "@bimmerz/ibus-core";
import logger, { Logger, LoggerOptions } from 'pino';
import { COMMAND_INDEX } from "@bimmerz/ibus-core";
import { COMMANDS as COMMON_COMMANDS } from "../types";
import { IBusInterface } from "@bimmerz/ibus-core";
import { RadioEvents } from "./events";
import { DeviceEventHandler } from "../types";


export declare interface Radio  {    
    on<K extends keyof RadioEvents>(name: K, listener: DeviceEventHandler<RadioEvents[K]>): this;
    emit<K extends keyof RadioEvents>(name: K, event: RadioEvents[K]): boolean;    
}

export class Radio extends DeviceTwin {
    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.Radio, 'Radio', ibusInterface, logger({ name: 'Radio', level: 'debug' }));               
    }
}

