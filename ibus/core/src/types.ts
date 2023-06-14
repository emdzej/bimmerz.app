import { UUID } from "crypto";
import { DEVICE } from "devices";

export type IBusMessage = {
    id?: UUID;
    source: DEVICE;
    destination: DEVICE;
    length?: number;
    checksum?: number;
    payload: Buffer;
};

export type IBusMessageHandler = (message: IBusMessage) => void;