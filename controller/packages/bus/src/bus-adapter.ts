import { EventEmitter } from "@bimmerz/core";
import { IBusMessage } from "./types";
import { MessageEvent } from "./protocol";

export type BusAdapterEvents = {
    message: MessageEvent;
};

export abstract class BusAdapter extends EventEmitter<BusAdapterEvents> {
    public abstract send(message: IBusMessage): void;  
    public abstract close(): void;  
};