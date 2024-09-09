import { DEVICE } from "@bimmerz/bus";
import { KNOWN_COMMANDS } from "../../types";
import { MODULE_STATUS } from "./types";

export function buildStatusRequest(source: DEVICE, target: DEVICE) {
    const payload = Buffer.from([
        KNOWN_COMMANDS.MODULE_STATUS_REQUEST
    ]);        
    const message = {
        source: source,
        destination: target,
        payload
    };
    return message;
}

export function buildStatusResponse(source: DEVICE, target: DEVICE, status: MODULE_STATUS) {
    const payload = Buffer.from([
        KNOWN_COMMANDS.MODULE_STATUS_RESPONSE,
        status
    ]);
    const message = {
        source: source,
        destination: target,
        payload
    };
    return message;
}