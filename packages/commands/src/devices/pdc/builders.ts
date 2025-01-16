import { DEVICE, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { BuilderRegistry, KNOWN_COMMANDS } from "../../types";

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

export type PdcBuiltCommandArgsTypes = {
    requestSensorStatus: DEVICE;
};

export const PDC_COMMAND_BUILDERS: BuilderRegistry<PdcBuiltCommandArgsTypes> = {
    requestSensorStatus: buldPdcSensorStatusRequest,
};