import { getKeyByValue } from "@bimmerz/core";
import { KNOWN_DEVICES } from "./devices";

export function getDeviceName(deviceId: number): string {
    return getKeyByValue(KNOWN_DEVICES, deviceId) || deviceId.toString(16); 
}