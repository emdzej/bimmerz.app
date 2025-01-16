import { EventEmitter } from "@bimmerz/core";
import { IBusMessage } from './types';
import { Logger }  from "@bimmerz/core";
import { BusAdapter } from './bus-adapter';
import { MessageEvent } from './protocol';

export type IBusInterfaceEvents = {
  message: MessageEvent;
}

export class IBusInterface extends EventEmitter<IBusInterfaceEvents> {
    private readonly _busAdapter;

    constructor(busAdapter: BusAdapter, logger: Logger) {
        super();
        this._busAdapter = busAdapter;      
        this._busAdapter.on('message', this.handleMessage, this);
    }

    private handleMessage(owner: any, message: MessageEvent): void {      
      (owner as this).emit('message',  message);
    }

    public sendMessage(message: IBusMessage): void {
        this._busAdapter.send(message);
    }
}