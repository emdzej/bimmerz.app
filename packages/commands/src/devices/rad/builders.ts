import { IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { BuilderRegistry, KNOWN_COMMANDS } from "../../types";
import { DisplayTextArgs } from "./types";

export type DisplayTextBuilder = IBusMessageBuilder<DisplayTextArgs>;

export function buildDisplayText({ source =  KNOWN_DEVICES.TEL, text } : DisplayTextArgs): IBusMessage {
    const encoder = new TextEncoder();
    encoder.encode(text);
    const payload = [
        0x23,
        0x42,
        0x32,
        ...encoder.encode(text),
    ];
        
    const message = {
        source: source,
        destination: KNOWN_DEVICES.IKE,
        payload
    }
    return message;
}

export type TelBuiltCommandArgsTypes = {
    displayText: DisplayTextArgs;
};

export const RAD_COMMAND_BUILDERS: BuilderRegistry<TelBuiltCommandArgsTypes> = {
    displayText: buildDisplayText,
};