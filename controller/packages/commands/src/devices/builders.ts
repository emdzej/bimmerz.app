import { KNOWN_DEVICES } from "@bimmerz/bus";
import { GM_COMMAND_BUILDERS } from "./gm";
import { RLS_COMMAND_BUILDERS } from "./rls";
import { RAD_COMMAND_BUILDERS } from "./rad";
import { MFL_COMMAND_BUILDERS } from "./mfl";
import { CDC_COMMAND_BUILDERS } from "./cdc";
import { LCM_COMMAND_BUILDERS } from "./lcm";
import { IKE_COMMAND_BUILDERS } from "./ike";
import { DeviceBuilderRegistry } from "../types";

export const DEVICE_BUILDERS_REGISTRY: DeviceBuilderRegistry = {
    [KNOWN_DEVICES.GM]: GM_COMMAND_BUILDERS,
    [KNOWN_DEVICES.RAD]: RAD_COMMAND_BUILDERS,
    [KNOWN_DEVICES.RLS]: RLS_COMMAND_BUILDERS,
    [KNOWN_DEVICES.MFL]: MFL_COMMAND_BUILDERS,
    [KNOWN_DEVICES.CDC]: CDC_COMMAND_BUILDERS,
    [KNOWN_DEVICES.LCM]: LCM_COMMAND_BUILDERS,
    [KNOWN_DEVICES.IKE]: IKE_COMMAND_BUILDERS
} as const;
