import { DEVICE, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { KNOWN_COMMANDS } from "../../types";

export function buldPdcSensorStatusRequest(source: DEVICE): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.PDC_SENSOR_REQUEST        
    ];
    const message = {
        source,
        destination: KNOWN_DEVICES.PDC,
        payload
    }
    return message;
}