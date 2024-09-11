import { getKeyByValue } from "@bimmerz/core";
import { KNOWN_DEVICES } from "./devices";
import { IBusMessage } from "./types";

export function getDeviceName(deviceId: number): string {
    return getKeyByValue(KNOWN_DEVICES, deviceId) || deviceId.toString(16); 
}


export function messageToArray(message: IBusMessage): number[] {
    return [
        message.source,
        message.length!,
        message.destination,
        ...message.payload,
        message.checksum!
    ];
}

export function arrayToMessage(data: number[]): IBusMessage {
    return {
        source: data[0],
        length: data[1],
        destination: data[2],
        payload: data.slice(3, data.length - 1),
        checksum: data[data.length - 1]
    }
}