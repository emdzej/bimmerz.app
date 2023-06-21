import { DEVICE } from "devices";

export type IBusMessage = {
    id?: number;
    source: DEVICE;
    destination: DEVICE;
    length?: number;
    checksum?: number;
    payload: Buffer;
};

export type EventHandler<T> = (event: T) => void; 

export type IBusMessageHandler = (message: IBusMessage) => void;