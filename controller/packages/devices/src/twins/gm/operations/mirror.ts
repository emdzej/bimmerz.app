import { IBusInterface, KNOWN_DEVICES } from "@bimmerz/bus";
import { DiagnosticOperations } from "../../../diagnostics";
import { buildBodyModuleFoldMirror, SIDE_MIRROR } from "@bimmerz/commands";
import { Logger } from "@bimmerz/core";


export class MirrorOperations extends DiagnosticOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.GM, ibusInterface, logger);
    }

    public foldMirror(mirror: SIDE_MIRROR): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleFoldMirror(mirror)
        );
    }
    
    public unfoldMirror(mirror: SIDE_MIRROR): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleFoldMirror(mirror)
        );
    }
}