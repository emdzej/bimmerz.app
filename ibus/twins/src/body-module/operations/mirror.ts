import { IBusInterface } from "@bimmerz/ibus-core";
import logger from 'pino';
import { BODY_MODULE_COMMANDS, DIAGNOSTIC_JOBS, SIDE_MIRROR } from "../types";
import { DiagnosticOperations } from "./types";

export class MirrorOperations extends DiagnosticOperations {
    constructor(ibusInterface: IBusInterface) {
        super(ibusInterface, logger({ name: 'MirrorOperations', level: 'debug' }));
    }

    public foldMirror(mirror: SIDE_MIRROR): void {
        const payload: Buffer = Buffer.from([
            BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
            mirror,
            DIAGNOSTIC_JOBS.FOLD_MIRROR,
            0x01
        ]);
        this.sendMessage(payload);
    }
    
    public unfoldMirror(mirror: SIDE_MIRROR): void {
        const payload: Buffer = Buffer.from([
            BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
            mirror,
            DIAGNOSTIC_JOBS.UNFOLD_MIRROR,
            0x01
        ]);
        this.sendMessage(payload);
    }
}