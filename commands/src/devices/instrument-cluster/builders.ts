import { DEVICE, IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/ibus";
import { COMMANDS } from "../../types";

export type InstrumentClusterRedundantDataRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildInstrumentClusterRedundantDataRequest(source: DEVICE = KNOWN_DEVICES.LIGHT_CONTROL_MODULE): IBusMessage {
    const payload = Buffer.from([
        COMMANDS.REDUNDANT_DATA_REQUEST
    ]);
    const message = {
        source,
        destination: KNOWN_DEVICES.InstrumentClusterElectronics,
        payload
    }
    return message;
}

export type InstrumentClusterIgnitionStatusRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildInstrumentClusterIgnitionStatusRequest(source: DEVICE): IBusMessage {
    const payload = Buffer.from([
        COMMANDS.IGNITION_STATUS_REQUEST
    ]);
    const message = {
        source,
        destination: KNOWN_DEVICES.InstrumentClusterElectronics,
        payload
    }
    return message;
}

export type InstrumentClusterSensorsStatusRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildInstrumentClusterSensorsStatusRequest(source: DEVICE): IBusMessage {
    const payload = Buffer.from([
        COMMANDS.SENSORS_STATUS_REQUEST
    ]);
    const message = {
        source: source,
        destination: KNOWN_DEVICES.InstrumentClusterElectronics,
        payload
    };
    return message;
}
