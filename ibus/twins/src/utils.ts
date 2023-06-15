import { DEVICE, KNOWN_DEVICES, IBusMessage } from "@bimmerz/ibus-core";

export function isForMe(deviceAddress: DEVICE, message: IBusMessage): boolean {
    return message.destination === deviceAddress;
}

export function isFromMe(deviceAddress: DEVICE,message: IBusMessage): boolean {
    return message.source === deviceAddress;
}

export function isBroadcast(message: IBusMessage): boolean {
    return message.destination === KNOWN_DEVICES.Broadcast;
}