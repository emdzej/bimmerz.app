import { CentralLockingOperations, VEHICLE_TYPES } from "@bimmerz/devices";
import { Feature } from "../types";
import { BluetoothDeviceEvent, BluetoothProximitySensor } from "./bt-senser";
import logger from "pino";

export class KeylessEntry extends Feature {
    private readonly _proximitySensor: BluetoothProximitySensor;
    private readonly _centralLockOperations: CentralLockingOperations;
    private readonly log = logger({ name: 'KeylessEntry', level: 'debug' });

    constructor(proximitySensor: BluetoothProximitySensor, centralLockOperations: CentralLockingOperations) {
        super();
        this._proximitySensor = proximitySensor;
        this._centralLockOperations = centralLockOperations;
        this._proximitySensor.on("knownDeviceInRange", (device) => this.handleKnownDeviceInRange(device));   
        this._proximitySensor.on("knownDeviceOutOfRange", (device) => this.handleKnownDeviceOutOfRange(device));         
    }
        
    private handleKnownDeviceInRange(device: BluetoothDeviceEvent): void {
        this.log.debug(`Known device ${device.name} in range, unlocking car`);
        this._centralLockOperations.unllockAllDoors(VEHICLE_TYPES.E46_Z4);
    }

    private handleKnownDeviceOutOfRange(device: BluetoothDeviceEvent): void {
        this.log.debug(`Known device ${device.name} out of range, locking car`);
        this._centralLockOperations.lockAllDoors(VEHICLE_TYPES.E46_Z4);
    }
}