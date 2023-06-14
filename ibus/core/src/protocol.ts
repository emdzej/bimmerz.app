import { Transform, TransformCallback, TransformOptions} from 'stream';
import logger, { Logger, LoggerOptions } from 'pino';
import { IBusMessage } from 'types';
import { randomUUID } from 'crypto';

export const COMMAND_INDEX = 0;
export const DATA_BYTE_1_INDEX = 1;
export const DATA_BYTE_2_INDEX = 2;
export const DATA_BYTE_3_INDEX = 3;

export class IBusProtocol extends Transform {
    private buffer: Buffer;
    private log: Logger<LoggerOptions>;
    private processId: number;
    private isProcessing: boolean;

    constructor(options?: TransformOptions) {
        super(options || {});
        this.buffer = Buffer.alloc(0)
        this.log = logger({ name: 'IbusProtocol' });
        this.processId = 0;
        this.isProcessing = false;
    }
    
    _flush(callback: TransformCallback): void {
        this.push(this.buffer);
        this.buffer = Buffer.alloc(0);
        callback();
    }

    _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void { 
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

            var endOfLastMessage = -1;
            var mSrc = 0;
            var mLen = 0;
            var mDst = 0;        
            var mMsg: Buffer;
            var mCrc = 0; 
    
            // look for messages in current chunk
            for (var i = 0; i < cchunk.length - 5; i++) {
    
                // BEGIN MESSAGE
                mSrc = cchunk[i + 0];
                mLen = cchunk[i + 1];
                mDst = cchunk[i + 2];
                        
                
                // test to see if have enough data for a complete message
                if (cchunk.length >= (i + 2 + mLen)) {
    
                    mMsg = cchunk.slice(i + 3, i + 3 + mLen - 2);
                    mCrc = cchunk[i + 2 + mLen - 1];
    
                    var crc = 0x00;
    
                    crc = crc ^ mSrc;
                    crc = crc ^ mLen;
                    crc = crc ^ mDst;
    
                    for (var j = 0; j < mMsg.length; j++) {
                        crc = crc ^ mMsg[j];
                    }
    
                    if (crc === mCrc) {
                        messages.push({
                            id : randomUUID(),
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

    encodeMessage(message: IBusMessage): Buffer {
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

        private calculateChecksum(buffer: Buffer, offset?: number, length?: number): number {
            let checksum = 0;
            for (let i = offset || 0; i < (length || buffer.length); i++) {
                checksum ^= buffer[i];
            }
            return checksum;
        }
}