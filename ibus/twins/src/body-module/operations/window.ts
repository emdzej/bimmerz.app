import { IBusInterface , KNOWN_DEVICES} from "@bimmerz/ibus-core";
import logger from 'pino';
import { BODY_MODULE_COMMANDS, DIAGNOSTIC_JOBS, WINDOW, DIAGNOSTIC_JOB, WINDOWS } from "../types";
import { DiagnosticOperations } from "../../types";

export class WindoOperations extends DiagnosticOperations {
    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.BODY_MODULE, ibusInterface, logger({ name: 'WindoOperations', level: 'debug' }));
    }

    public openWindow(window: WINDOW): void {
        var job: DIAGNOSTIC_JOB;

        switch (window) {
            case WINDOWS.DRIVER_FRONT: job = DIAGNOSTIC_JOBS.OPEN_WINDOW_DRIVER_FRONT; break;
            case WINDOWS.DRIVER_REAR: job = DIAGNOSTIC_JOBS.OPEN_WINDOW_DRIVER_REAR; break;
            case WINDOWS.PASSENGER_FRONT: job = DIAGNOSTIC_JOBS.OPEN_WINDOW_PASSENGER_FRONT; break;
            case WINDOWS.PASSENGER_REAR: job = DIAGNOSTIC_JOBS.OPEN_WINDOW_PASSENGER_REAR; break;
            default: return;
        }

        this.sendWindowJob(job);
    }

    public closeWindow(window: WINDOW): void {
        var job: DIAGNOSTIC_JOB;

        switch (window) {
            case WINDOWS.DRIVER_FRONT: job = DIAGNOSTIC_JOBS.CLOSE_WINDOW_DRIVER_FRONT; break;
            case WINDOWS.DRIVER_REAR: job = DIAGNOSTIC_JOBS.CLOSE_WINDOW_DRIVER_REAR; break;
            case WINDOWS.PASSENGER_FRONT: job = DIAGNOSTIC_JOBS.CLOSE_WINDOW_PASSENGER_FRONT; break;
            case WINDOWS.PASSENGER_REAR: job = DIAGNOSTIC_JOBS.CLOSE_WINDOW_PASSENGER_REAR; break;
            default: return;
        }

        this.sendWindowJob(job);
    }

    private sendWindowJob(job: DIAGNOSTIC_JOB): void {
        const payload: Buffer = Buffer.from([
            BODY_MODULE_COMMANDS.DIAGNOSTIC_REQUEST,
            job,
            0x01
        ]);
        this.sendMessage(payload);
    }
}