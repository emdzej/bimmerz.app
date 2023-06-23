import { DEVICE, IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/ibus";
import { COMMANDS } from "../../types";

export type BodyModuleDoorLidStatusRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildBodyModuleDoorLidStatusRequest(source: DEVICE): IBusMessage {
    const payload = Buffer.from([
        COMMANDS.DOOR_LID_STATUS_REQUEST
    ]);
    const message: IBusMessage = {
        source,
        destination: KNOWN_DEVICES.BODY_MODULE,
        payload
    }
    return message;
}