import { DeviceEvent, DeviceEvents } from "twins/types";
import { CENTRAL_LOCKING_STATUS, DoorLidStatuses, LAMP_STATUS, WindowStatusesChangedEvent } from "./types";

export type DoorLidStatusesChangedEvent = {
    doorLidStatuses: DoorLidStatuses;
};

export type DoorLidStatusRequestEvent = DeviceEvent;

export type CentralLockingStatusChangedEvent = {
    status: CENTRAL_LOCKING_STATUS;
};

export type InteriorLightStatusChangedEvent = {
    status: LAMP_STATUS;
};

export type BodyModuleEvents = DeviceEvents & {
    doorLidStatusesChange: DoorLidStatusesChangedEvent;
    windowStatusesChange: WindowStatusesChangedEvent;
    centralLockingStatusChange: CentralLockingStatusChangedEvent;
    interiorLightStatusChange: InteriorLightStatusChangedEvent;
    doorLidStatusRequest: DoorLidStatusRequestEvent;
}