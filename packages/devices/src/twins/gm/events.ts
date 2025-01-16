import { DoorLidStatuses, CENTRAL_LOCKING_STATUS, LAMP_STATUS, WindowStatusesChangedEvent } from "@bimmerz/commands";
import { DeviceEvent, DeviceEvents } from "../../devices";

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