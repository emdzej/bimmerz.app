import { DEVICE } from "@bimmerz/bus";
import { KNOWN_COMMANDS } from "../../types";
import { MODULE_STATUS } from "./types";

export type DeviceStatusRequestArgs = {
    source: DEVICE;
    target: DEVICE;
};

export function buildStatusRequest({source, target}: DeviceStatusRequestArgs) {
    const payload = [
        KNOWN_COMMANDS.MODULE_STATUS_REQUEST
    ];
    const message = {
        source: source,
        destination: target,
        payload
    };
    return message;
}

export type DeviceStatusResponseArgs = {
    source: DEVICE;
    target: DEVICE;
    status: MODULE_STATUS;
};

export function buildStatusResponse({source, target, status}: DeviceStatusResponseArgs) {
    const payload = [
        KNOWN_COMMANDS.MODULE_STATUS_RESPONSE,
        status
    ];
    const message = {
        source: source,
        destination: target,
        payload
    };
    return message;
}

