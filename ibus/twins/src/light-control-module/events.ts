import { DeviceEvent, DeviceEvents } from "../types";
import { LigthStatus,LIGHT_MODULE_VARIANT } from "./types";

export type LightStatusEvent = {
    lightStatus: LigthStatus;
};

export type ModuleStatusEvent = {
    variant?: LIGHT_MODULE_VARIANT;
    dimmerVoltage?: number;
    frontLoadVoltage?: number;
    rearLoadVoltage?: number;
    photoVoltage?: number;
}

 export type LightControlModuleEvents = DeviceEvents & {
    lightStatusRequest: DeviceEvent,
    lightStatusResponse: LightStatusEvent,
    diagnosticRequest: DeviceEvent,
    diagnosticResponse: ModuleStatusEvent,    
    dimmerStatus: DeviceEvent,    
}