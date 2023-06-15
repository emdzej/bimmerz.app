import EventEmitter from "events";
import { VehicleEvents } from "./events";
import { VehicleEventHandler } from "./types";
import { VEHICLE_TYPE } from "instrument-cluster";
import { DeviceTwin } from "device-twin";
import { IBusInterface } from "@bimmerz/ibus";

export declare interface Vehicle  {    
    on<K extends keyof VehicleEvents>(name: K, listener: VehicleEventHandler<VehicleEvents[K]>): this;
    emit<K extends keyof VehicleEvents>(name: K, event: VehicleEvents[K]): boolean;    
}

// This acts as a context for all the devices
// especially those which need to know the information
// about other devices on the bus
export class Vehicle extends EventEmitter {
    private readonly twins: DeviceTwin[] = [];
    public readonly IBusInterface: IBusInterface;
    private type?: VEHICLE_TYPE;
    private vin?: string;

    constructor(IBusInterface: IBusInterface) {
        super();
        this.IBusInterface = IBusInterface;
    }

    public equip(device: DeviceTwin): void {
        this.twins.push(device);        
    }
}