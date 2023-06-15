import { DEVICE, IBusInterface, IBusMessage, KNOWN_DEVICES } from "@bimmerz/ibus-core";
import { Logger, LoggerOptions } from "pino";
export const COMMANDS = {
    MODULE_STATUS_REQUEST: 0x01,
    MODULE_STATUS_RESPONE: 0x02
} as const;

export type COMMAND = typeof COMMANDS[keyof typeof COMMANDS];

export const MODULE_STATUSES = {
    MODULE_PRESENT: 0x00,
    MODULE_ANNOUNCE: 0x01
} as const;

export type MODULE_STATUS = typeof MODULE_STATUSES[keyof typeof MODULE_STATUSES];

export type DeviceEvent = {
    source: DEVICE;
    destination: DEVICE;
}

export type DeviceEventHandler<T> = (event: T) => void; 

export type DeviceEvents = {
    moduleStatusRequest: DeviceEvent;
    moduleStatusResponse: DeviceEvent;
};

export const MODULE_STATUS_REQUEST_EVENT = 'moduleStatusRequest';
export const MODULE_STATUS_RESPONSE_EVENT = 'moduleStatusResponse';

export abstract class DeviceOperations {
    protected readonly ibusInterface: IBusInterface;
    protected readonly log: Logger<LoggerOptions>;

    constructor(ibusInterface: IBusInterface, log: Logger<LoggerOptions>) {
        this.ibusInterface = ibusInterface;
        this.log = log;
    }
}

export const DIAGNOSTIC_COMMANDS = {
    REQUEST_IDENTITY: 0x00,
    GET_IO_STATUS: 0x0B,
    TERMINATE_DIAGNOSTIC: 0x9F
} as const;

export abstract class DiagnosticOperations extends DeviceOperations {
    private readonly device: DEVICE;

    constructor(device: DEVICE, ibusInterface: IBusInterface, log: Logger<LoggerOptions>) {
        super(ibusInterface, log);
        this.device = device;        
    }

    protected sendMessage(payload: Buffer): void {
        const message: IBusMessage = {
            source: KNOWN_DEVICES.DIAGNOSTIC,
            destination: this.device,
            payload
        }
        this.ibusInterface.sendMessage(message);
    }

    public requestIOStatus() {
        const payload = Buffer.from([DIAGNOSTIC_COMMANDS.GET_IO_STATUS]);
        this.sendMessage(payload);
    }

    public requestIdentity() {
        const payload = Buffer.from([DIAGNOSTIC_COMMANDS.REQUEST_IDENTITY]);
        this.sendMessage(payload);
    }

    public terminateDiagnostics(): void {
        const payload = Buffer.from([DIAGNOSTIC_COMMANDS.TERMINATE_DIAGNOSTIC]);
        this.sendMessage(payload);
    }
}

export type IBusMessageDecoderFunction<T, A> = (message: IBusMessage, args: A) => T;
export type IBusMessageEncoderFunction<A> = (source: DEVICE, destination: DEVICE, args: A) => IBusMessage;