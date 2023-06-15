import logger from 'pino';
import { IBusInterface, KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { DiagnosticOperations } from "../../types";
import { LIGHT_MODULE_VARIANT } from 'light-control-module/types';

export class LightsOperations extends DiagnosticOperations {
    private readonly lightModuleVariant: LIGHT_MODULE_VARIANT;

    constructor(lightModuleVariant: LIGHT_MODULE_VARIANT, ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.LightControlModule, ibusInterface, logger({ name: 'LightsOperations', level: 'debug' }));
        this.lightModuleVariant = lightModuleVariant;
    }
}