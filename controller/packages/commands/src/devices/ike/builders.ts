import { DEVICE, IBusMessageBuilder, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { BuilderRegistry, KNOWN_COMMANDS } from "../../types";
import { IGNITION_STATUS } from "./types";

export type InstrumentClusterRedundantDataRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildInstrumentClusterRedundantDataRequest(source: DEVICE = KNOWN_DEVICES.LCM): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.REDUNDANT_DATA_REQUEST
    ];
    const message = {
        source,
        destination: KNOWN_DEVICES.IKE,
        payload
    }
    return message;
}

export type InstrumentClusterIgnitionStatusRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildInstrumentClusterIgnitionStatusRequest(source: DEVICE): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.IGNITION_STATUS_REQUEST
    ];
    const message = {
        source,
        destination: KNOWN_DEVICES.IKE,
        payload
    }
    return message;
}

export type InstrumentClusterSensorsStatusRequestBuilder = IBusMessageBuilder<DEVICE>;

export function buildInstrumentClusterSensorsStatusRequest(source: DEVICE): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.SENSORS_STATUS_REQUEST
    ];
    const message = {
        source: source,
        destination: KNOWN_DEVICES.IKE,
        payload
    };
    return message;
}

export type IgnitionStatusResponseBuilderArgs = {
    status: IGNITION_STATUS;
    target: DEVICE;
};


export type InstrumentClusterIgnitionStatusResponseBuilder = IBusMessageBuilder<IgnitionStatusResponseBuilderArgs>;

export function buildInstrumentClusterIgnitionStatusResponse({target, status}: IgnitionStatusResponseBuilderArgs): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.IGNITION_STATUS_RESPONSE,
        status
    ];
    const message = {
        source: KNOWN_DEVICES.IKE,
        destination: target,
        payload
    }
    return message;
}

export function buildOdometerRequest(source: DEVICE): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.ODOMETER_REQUEST
    ];
    const message = {
        source,
        destination: KNOWN_DEVICES.IKE,
        payload
    }
    return message;
}

export function buildTemperatureRequest(source: DEVICE): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.TEMP_REQUEST
    ];
    const message = {
        source,
        destination: KNOWN_DEVICES.IKE,
        payload
    }
    return message;
}

export type IkeBuiltCommandArgsTypes = {
    requestVehicleData: DEVICE;
    requestIgnitionStatus: DEVICE;
    requestSensorsStatus: DEVICE;
    responseIgnitionStatus: IgnitionStatusResponseBuilderArgs;
    requestOdometer: DEVICE;
    requestTemperature: DEVICE;
};

export const IKE_COMMAND_BUILDERS: BuilderRegistry<IkeBuiltCommandArgsTypes> = {
    requestVehicleData: buildInstrumentClusterRedundantDataRequest,
    requestIgnitionStatus: buildInstrumentClusterIgnitionStatusRequest,
    requestSensorsStatus: buildInstrumentClusterSensorsStatusRequest,
    responseIgnitionStatus: buildInstrumentClusterIgnitionStatusResponse,
    requestOdometer: buildOdometerRequest,
    requestTemperature: buildTemperatureRequest
};