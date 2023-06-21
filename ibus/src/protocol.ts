import { IBusMessage } from './types';
import { EventEmitter, Logger } from '@bimmerz/core';

export const COMMAND_INDEX = 0;
export const DATA_BYTE_1_INDEX = 1;
export const DATA_BYTE_2_INDEX = 2;
export const DATA_BYTE_3_INDEX = 3;

export type MessageEvent = IBusMessage;

export type IbusProtocolEvents = {
    message: MessageEvent;
}

export type ProtocolCallback = (error?: Error | null) => void;

export abstract class IBusProtocol extends EventEmitter<IbusProtocolEvents> {

    public abstract flush(callback: ProtocolCallback): void;
    public abstract transform(chunk: Buffer, callback: ProtocolCallback): void;
    public abstract encodeMessage(message: IBusMessage): Buffer;

    protected calculateChecksum(buffer: Buffer, offset?: number, length?: number): number {
        let checksum = 0;
        for (let i = offset || 0; i < (length || buffer.length); i++) {
            checksum ^= buffer[i];
        }
        return checksum;
   }
}