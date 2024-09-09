import { IBusInterface , KNOWN_DEVICES} from "@bimmerz/bus";

import { DiagnosticOperations } from "../../../diagnostics";
import { WINDOW, buildBodyModuleOpenWindow, buildBodyModuleCloseWindow } from "@bimmerz/commands";
import { Logger } from "@bimmerz/core";

export class WindoOperations extends DiagnosticOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.BODY_MODULE, ibusInterface, logger);
    }

    public openWindow(window: WINDOW): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleOpenWindow(window)
        );        
    }

    public closeWindow(window: WINDOW): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleCloseWindow(window)
        );
    }
}