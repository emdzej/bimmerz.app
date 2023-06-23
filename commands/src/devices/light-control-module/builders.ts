import { DEVICE, IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/ibus";
import { COMMANDS } from "../../types";

export type LightControlModuleLightStatusRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildLightControlModuleLightStatusRequest(source: DEVICE): IBusMessage {
    const payload = Buffer.from([
        COMMANDS.LIGHT_STATUS_REQUEST
    ]);
    const message = {
        source,
        destination: KNOWN_DEVICES.LIGHT_CONTROL_MODULE,
        payload
    }
    return message;
}
