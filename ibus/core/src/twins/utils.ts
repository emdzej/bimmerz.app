import { DEVICE, KNOWN_DEVICES } from "../devices";
import { IBusMessage } from "../types";

export function isForMe(deviceAddress: DEVICE, message: IBusMessage): boolean {
    return message.destination === deviceAddress;
}

export function isFromMe(deviceAddress: DEVICE,message: IBusMessage): boolean {
    return message.source === deviceAddress;
}

export function isBroadcast(message: IBusMessage): boolean {
    return message.destination === KNOWN_DEVICES.Broadcast;
}