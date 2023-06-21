import { IBusInterface, KNOWN_DEVICES } from "@bimmerz/ibus";
import { DiagnosticOperations } from "../../types";
import { LIGHT_MODULE_VARIANT } from 'light-control-module/types';
import { Logger } from "@bimmerz/core";

export class LightsOperations extends DiagnosticOperations {
    private readonly lightModuleVariant: LIGHT_MODULE_VARIANT;

    constructor(lightModuleVariant: LIGHT_MODULE_VARIANT, ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.LIGHT_CONTROL_MODULE, ibusInterface, logger);
        this.lightModuleVariant = lightModuleVariant;
    }
}