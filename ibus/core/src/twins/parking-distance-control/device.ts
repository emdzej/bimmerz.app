import { KNOWN_DEVICES } from "../../devices";
import { DeviceTwin } from "../device-twin";
import { IBusMessage } from "types";
import { IBusInterface } from "../../interface";
import logger, { Logger, LoggerOptions } from 'pino';
import { DeviceEvents, DeviceEventHandler } from "twins/types";
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