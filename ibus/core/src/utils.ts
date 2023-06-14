import { KNOWN_DEVICES } from "./devices";

function getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => object[key] === value);    
}

export function getDeviceName(deviceId: number) {
    return getKeyByValue(KNOWN_DEVICES, deviceId);
}