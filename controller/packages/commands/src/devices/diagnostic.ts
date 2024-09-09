import { DEVICE, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { KNOWN_COMMANDS } from "../types";

export function buildDiagnosticRequest(payload: number[], target: DEVICE) {
    const message: IBusMessage = {
        source: KNOWN_DEVICES.DIAGNOSTIC,
        destination: target,
        payload
    }
    return message;
}

export function buildIOStatusRequest(target: DEVICE) {
    const payload = [
        KNOWN_COMMANDS.GET_IO_STATUS
    ];
    return buildDiagnosticRequest(payload, target);
}

export function buildIdentityRequest(target: DEVICE) {
    const payload = [
        KNOWN_COMMANDS.REQUEST_IDENTITY
    ];
    return buildDiagnosticRequest(payload, target);
}

export function buildTerminateDiagnostic(target: DEVICE): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.TERMINATE_DIAGNOSTIC
    ];
    return buildDiagnosticRequest(payload, target);
}