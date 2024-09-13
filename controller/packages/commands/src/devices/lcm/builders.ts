import { DEVICE, IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { BuilderRegistry, KNOWN_COMMANDS } from "../../types";

export type LightControlModuleLightStatusRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildLightControlModuleLightStatusRequest(source: DEVICE): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.LIGHT_STATUS_REQUEST
    ];
    const message = {
        source,
        destination: KNOWN_DEVICES.LCM,
        payload
    }
    return message;
}

export type LcmBuiltCommandArgsTypes = {
    requestLightStatus: DEVICE;
};

export const LCM_COMMAND_BUILDERS: BuilderRegistry<LcmBuiltCommandArgsTypes> = {
    requestLightStatus: buildLightControlModuleLightStatusRequest,
}