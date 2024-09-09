import { DEVICE } from "./devices";

export type Payload = Array<number>;

export type IBusMessage = {
    id?: number;
    source: DEVICE;
    destination: DEVICE;
    length?: number;
    checksum?: number;
    payload: Payload
};

export type EventHandler<T> = (event: T) => void; 

export type IBusMessageHandler = (message: IBusMessage) => void;

export type IBusMessageParser<T> = (message: IBusMessage) => T;

export type IBusMessageBuilder<T> = (input: T) => IBusMessage;