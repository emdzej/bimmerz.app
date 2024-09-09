import { DEVICE, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { KNOWN_COMMANDS } from "../../types";

export function buldPdcSensorStatusRequest(source: DEVICE): IBusMessage {
    const payload = Buffer.from([
        KNOWN_COMMANDS.PDC_SENSOR_REQUEST        
    ]);
    const message = {
        source,
        destination: KNOWN_DEVICES.PARK_DISTANCE_CONTROL,
        payload
    }
    return message;
}