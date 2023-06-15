import { DeviceOperations } from "../../types";
import logger from 'pino';
import { KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { IBusInterface } from "@bimmerz/ibus-core";

export class DisplayOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface) {
        super(ibusInterface, logger({ name: 'DisplayOperations', level: 'debug' }));
    }

    public displayText(text: String): void {
        const payload = Buffer.alloc(text.length + 3);
        payload[0] = 0x23;
        payload[1] = 0x42;
        payload[2] = 0x32;
        Buffer.from(text).copy(payload, 3);        
        const message = {
            source: KNOWN_DEVICES.Telephone,
            destination: KNOWN_DEVICES.InstrumentClusterElectronics,
            payload
        }
        this.ibusInterface.sendMessage(message);
    }
}