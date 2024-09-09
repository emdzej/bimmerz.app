import { IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { KNOWN_COMMANDS } from "../../types";
import { DisplayTextArgs } from "./types";

export type DisplayTextBuilder = IBusMessageBuilder<DisplayTextArgs>;

export function buildDisplayText({ source =  KNOWN_DEVICES.Telephone, text } : DisplayTextArgs): IBusMessage {
    const payload = Buffer.alloc(text.length + 3);
    payload[0] = 0x23;
    payload[1] = 0x42;
    payload[2] = 0x32;
    Buffer.from(text).copy(payload, 3);        
    const message = {
        source: source,
        destination: KNOWN_DEVICES.InstrumentClusterElectronics,
        payload
    }
    return message;;
}
