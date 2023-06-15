import { KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { DeviceTwin } from "../device-twin";
import { IBusMessage } from "@bimmerz/ibus-core";
import { IBusInterface } from "@bimmerz/ibus-core";
import logger, { Logger, LoggerOptions } from 'pino';
import { DeviceEvents, DeviceEventHandler } from "../types";
import { ParkingDistanceControlModuleEvents } from "./events";



export declare interface ParkingDistanceControlModule  {    
    on<K extends keyof ParkingDistanceControlModuleEvents>(name: K, listener: DeviceEventHandler<ParkingDistanceControlModuleEvents[K]>): this;
    emit<K extends keyof ParkingDistanceControlModuleEvents>(name: K, event: ParkingDistanceControlModuleEvents[K]): boolean;    
}

export class ParkingDistanceControlModule extends DeviceTwin {
    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.ParkDistanceControl, 'Parking Distance Control Module', ibusInterface, logger({ name: 'PDC', level: 'debug' }));
    };
}