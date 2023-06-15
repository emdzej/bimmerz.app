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

export function checkBit<T = number>(value: number, position: number): T{
    return ((value & (1 << position)) >> position) as T;
}

export function clearBit(value: number, position: number): number {
    return ((value) & ~!(1 << position));
}

export function setBit(value: number, position: number): number {
    return value | (1 << position);
}
