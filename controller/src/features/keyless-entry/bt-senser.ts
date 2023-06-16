import EventEmitter from "events";
import noble from "@abandonware/noble"
import { EventHandler } from "@bimmerz/ibus";
import logger from "pino";

export type BluetoothDeviceEvent = {
    id: string;
    name: string;
    address: string;
    rssi: number;
}

export type BluetoothSenserEvents = {
    knownDeviceInRange: BluetoothDeviceEvent;
    knownDeviceOutOfRange: BluetoothDeviceEvent;
}

export declare interface BluetoothProximitySensor  {    
    on<K extends keyof BluetoothSenserEvents>(name: K, listener: EventHandler<BluetoothSenserEvents[K]>): this;
    emit<K extends keyof BluetoothSenserEvents>(name: K, event: BluetoothSenserEvents[K]): boolean;    
}

export class BluetoothProximitySensor extends EventEmitter {
    private readonly log = logger({ name: 'BluetoothSenser', level: 'debug' });
    private readonly knownDevices: string[] = ["44fd98c9104de0972cfdbc270676957f", "61b0cc9a1774ce7b684f12df5a79093f"];
    private readonly rssiLimit: number = -70;

    constructor() {
        super();
    }

    public init(): void {
        noble.on('stateChange', async (state) => {
                if (state === 'poweredOn') {
                    this.log.debug('Starting scan...');
                    await noble.startScanningAsync();
                }
        });

        noble.on('discover', async (peripheral) => {
            if (this.knownDevices.includes(peripheral.id) && peripheral.rssi > this.rssiLimit) {
                this.log.debug(`Known device ${peripheral.advertisement.localName} found with RSSI ${peripheral.rssi}`);
                await noble.stopScanningAsync();
                this.emit('knownDeviceInRange', {
                    id: peripheral.id,
                    rssi: peripheral.rssi,
                    name: peripheral.advertisement.localName,
                    address: peripheral.address,
                });
            }
        });
    }

    public dispose(): void {
    }
}