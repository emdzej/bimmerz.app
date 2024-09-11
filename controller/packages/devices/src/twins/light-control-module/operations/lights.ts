import { IBusInterface, KNOWN_DEVICES } from "@bimmerz/bus";
import { LIGHT_MODULE_VARIANT } from "@bimmerz/commands";

import { Logger } from "@bimmerz/core";
import { DiagnosticOperations } from "../../../diagnostics";

export class LightsOperations extends DiagnosticOperations {
    private readonly lightModuleVariant: LIGHT_MODULE_VARIANT;

    constructor(lightModuleVariant: LIGHT_MODULE_VARIANT, ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.LCM, ibusInterface, logger);
        this.lightModuleVariant = lightModuleVariant;
    }
}