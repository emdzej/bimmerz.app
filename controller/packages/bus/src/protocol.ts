import { IBusMessage } from './types';
import { EventEmitter, Logger } from '@bimmerz/core';

const SOURCE_INDEX = 0;
const LENGTH_INDEX = 1;
const DESTINATION_INDEX = 2;
const PAYLOAD_INDEX = 3;

const MAX_PAYLOAD_LENGTH = -0xFF;
const MAX_MESSAGE_LENGTH = MAX_PAYLOAD_LENGTH + 2;

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

export class IBusProtocolNode extends IBusProtocol {
    private readonly log: Logger;
    private buffer: Buffer;
    private processId: number;
    private isProcessing: boolean;
    private _messageId: number = 0;

    constructor(logger: Logger) {
        super();
        this.buffer = Buffer.alloc(0)
        this.log = logger;
        this.processId = 0;
        this.isProcessing = false;
    }

    public flush(callback: ProtocolCallback): void {
        this.buffer = Buffer.alloc(0);
        callback();
    }

    public transform(chunk: Buffer, callback: ProtocolCallback): void {
        if (this.isProcessing === true) {
            this.log.error("This _transform function should NOT be running..");
        }

        this.isProcessing = true;

        this.log.debug(`Processing: ${this.processId}`);
        this.log.debug(`Current buffer: ${this.buffer}`);
        this.log.debug(`Current chunk: ${chunk}`);

        this.processId++;

        this.buffer = Buffer.concat([this.buffer, chunk]);

        const cchunk = this.buffer;

        this.log.debug(`Concated chunk: ${cchunk}`);

        if (cchunk.length >= 5) {
            this.log.debug(`Analyzing: ${cchunk}`);

            // gather messages from current chunk
            const messages: Array<IBusMessage> = [];

            let endOfLastMessage = -1;
            let mSrc = 0;
            let mLen = 0;
            let mDst = 0;
            let mMsg: Buffer;
            let mCrc = 0;

            // look for messages in current chunk
            for (let i = 0; i < cchunk.length - 5; i++) {

                // BEGIN MESSAGE
                mSrc = cchunk[i + 0];
                mLen = cchunk[i + 1];
                mDst = cchunk[i + 2];


                // test to see if have enough data for a complete message
                if (cchunk.length >= (i + 2 + mLen)) {

                    mMsg = cchunk.slice(i + 3, i + 3 + mLen - 2);
                    mCrc = cchunk[i + 2 + mLen - 1];

                    let crc = 0x00;

                    crc = crc ^ mSrc;
                    crc = crc ^ mLen;
                    crc = crc ^ mDst;

                    for (let j = 0; j < mMsg.length; j++) {
                        crc = crc ^ mMsg[j];
                    }

                    if (crc === mCrc) {
                        messages.push({
                            id: this._messageId++,
                            source: mSrc,
                            length: mLen,
                            destination: mDst,
                            payload: mMsg,
                            checksum: mCrc
                        });

                        // mark end of last message
                        endOfLastMessage = (i + 2 + mLen);

                        // skip ahead
                        i = endOfLastMessage - 1;
                    }
                }
                // END MESSAGE
            }

            if (messages.length > 0) {
                messages.forEach(message => this.emit('message', message));
            }

            // Push the remaining data back to the stream
            if (endOfLastMessage !== -1) {
                // Push the remaining chunk from the end of the last valid Message
                this.buffer = <Buffer>Uint8Array.prototype.slice.call(cchunk, endOfLastMessage);
                this.log.debug(`Sliced data: ${endOfLastMessage}, ${this.buffer}`);
            } else {
                // Push the entire chunk
                if (this.buffer.length > 500) {
                    // Chunk too big? (overflow protection)
                    this.log.warn('dropping some data..');
                    this.buffer = <Buffer>Uint8Array.prototype.slice.call(chunk, chunk.length - 300);
                }
            }
        }

        this.log.debug(`Buffered messages size: ${this.buffer.length}`);
        this.isProcessing = false;
        callback();
    };

    public encodeMessage(message: IBusMessage): Buffer {
        // 1 + 1 + 1 + msgLen + 1
        const packetLength = 4 + message.payload.length;
        const result = Buffer.alloc(packetLength);
        result[0] = message.source
        result[1] = message.payload.length + 2;
        result[2] = message.destination;

        message.payload.copy(result, 3);

        result[packetLength - 1] = this.calculateChecksum(result, 0, packetLength - 1);

        return result;
    };
}