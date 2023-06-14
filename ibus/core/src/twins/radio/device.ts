import { KNOWN_DEVICES } from "../../devices";
import { DeviceTwin } from "../device-twin";
import { IBusMessage, IBusMessageHandler } from "../../types";
import logger, { Logger, LoggerOptions } from 'pino';
import { COMMAND_INDEX } from "../../protocol";
import { COMMANDS as COMMON_COMMANDS } from "../commands";
import { IBusInterface } from "../../interface";
import { RadioEvents } from "./events";
import { DeviceEventHandler } from "twins/types";


export declare interface Radio  {    
    on<K extends keyof RadioEvents>(name: K, listener: DeviceEventHandler<RadioEvents[K]>): this;
    emit<K extends keyof RadioEvents>(name: K, event: RadioEvents[K]): boolean;    
}

export class Radio extends DeviceTwin {

    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.Radio, 'Radio', ibusInterface, logger({ name: 'Radio', level: 'debug' }));               
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

