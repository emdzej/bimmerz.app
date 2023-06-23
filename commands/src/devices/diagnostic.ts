import { DEVICE, IBusMessage, KNOWN_DEVICES } from "@bimmerz/ibus";
import { COMMANDS } from "../types";

export function buildDiagnosticRequest(payload: Buffer, target: DEVICE) {
    const message: IBusMessage = {
        source: KNOWN_DEVICES.DIAGNOSTIC,
        destination: target,
        payload
    }
    return message;
}

export function buildIOStatusRequest(target: DEVICE) {
    const payload = Buffer.from([COMMANDS.GET_IO_STATUS]);
    return buildDiagnosticRequest(payload, target);
}

export function buildIdentityRequest(target: DEVICE) {
    const payload = Buffer.from([COMMANDS.REQUEST_IDENTITY]);
    return buildDiagnosticRequest(payload, target);
}

export function buildTerminateDiagnostic(target: DEVICE): IBusMessage {
    const payload = Buffer.from([COMMANDS.TERMINATE_DIAGNOSTIC]);
    return buildDiagnosticRequest(payload, target);
}