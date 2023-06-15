import { KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { DeviceTwin } from "../device-twin";
import { IBusMessage } from "@bimmerz/ibus-core";
import { IBusInterface } from "@bimmerz/ibus-core";
import logger, { Logger, LoggerOptions } from 'pino';
import { DeviceEvents, DeviceEventHandler } from "../types";
import { LightControlModuleEvents } from "./events";

export declare interface LightControlModule  {    
    on<K extends keyof LightControlModuleEvents>(name: K, listener: DeviceEventHandler<LightControlModuleEvents[K]>): this;
    emit<K extends keyof LightControlModuleEvents>(name: K, event: LightControlModuleEvents[K]): boolean;    
}

export class LightControlModule extends DeviceTwin {
    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.LightControlModule, 'Light Control Module', ibusInterface, logger({ name: 'LCM', level: 'debug' }));
    };
}