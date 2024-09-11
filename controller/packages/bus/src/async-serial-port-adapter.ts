import { Transform, TransformCallback, TransformOptions } from 'stream';
import { SerialPort } from 'serialport';
import { IBusProtocol } from "./protocol"
import { IBusMessage } from "./types"
import { BusAdapter } from "./bus-adapter"
import { getDeviceName } from "./utils"
import { arrayToHex, Logger } from '@bimmerz/core';

class ProtocolTransform extends Transform {
  private readonly log: Logger;
  private _protocol: IBusProtocol;

  constructor(protocol: IBusProtocol, logger: Logger, options?: TransformOptions) {
    super(options || {});
    this.log = logger;
    this._protocol = protocol;
    this._protocol.on('message', this.handleMessage, this);
  }

  private handleMessage(owner: any, message: IBusMessage): any {
    (owner as this).emit('message', message);
  }

  public _flush(callback: TransformCallback): void {
    this._protocol.flush(callback);
  }

  public _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
    this._protocol.transform(chunk, callback);
  };
}

type PortStatus = Parameters<Parameters<SerialPort['get']>[0]>[1];

export class SerialPortAdapter extends BusAdapter {
  private _serialPort?: SerialPort;
  private _device: string;
  private _queue: Array<Buffer> = [];
  private _protocolTransform: ProtocolTransform;
  private log: Logger;  
  private _protocol: IBusProtocol;

  constructor(protocol: IBusProtocol, device: string, logger: Logger) {
    super();
    this._device = device;
    this.log = logger;
    this._protocolTransform = new ProtocolTransform(protocol, logger);
    this._protocol = protocol;

    this._serialPort = new SerialPort({
      path: this._device,
      autoOpen: false,
      baudRate: 9600,
      parity: 'even',
      stopBits: 1,
      dataBits: 8
    });


    const parser = this._serialPort.pipe(this._protocolTransform);


    parser.on('message', (message: IBusMessage) => {
      this.log.debug(`Received message from ${getDeviceName(message.source)} to: ${getDeviceName(message.destination)}, data: ${arrayToHex(message.payload)}`);
      this.emit('message', message);
    });

    this._serialPort.on('open', () => {
      this.log.debug(`Opened ${this._device}`);

    });

    this._serialPort.open((err) => {
      if (err) {
        this.log.error(`Error opening port: ${err.message}`);
        return;
      }
    });
  }

  private async getLineStatus() {
    const modemStatus = await new Promise<PortStatus>((resolve, reject) => {
      this._serialPort?.get((error, status) => {
        if (error) return reject(error);
        resolve(status);
      });
    });
    return modemStatus;
  }

  private async canSend() {
    const modemStatus = await this.getLineStatus();
    return modemStatus?.cts === true;
  }

  public send(message: IBusMessage) {
    if (this._queue.length > 1000) {
      this.log.warn("Queue too large, dropping message", message);
      return;
    }
    this.log.debug(`Queuing message from ${getDeviceName(message.source)} to: ${getDeviceName(message.destination)}, data: ${message.payload}`);
    const buffer = this._protocol.encodeMessage(message);
    this._queue.unshift(buffer);
    this.canSend().then((ready) => {
      if (ready) {
        this.processOutGoingQueue();
      }
    }).catch((error) => {
      this.log.error("Failed to check modem status", error);
    });
  }


  private processOutGoingQueue() {
    // noop on empty queue
    if (this._queue.length <= 0) {

      return;
    }
    // process 1 message
    this.log.debug(this._queue, "Queue");
    var dataBuf = this._queue.pop();
    this._serialPort?.write(dataBuf, (error) => {
      if (error) {
        this.log.error('Failed to write: ' + error);
      } else {
        this.log.debug('Wrote to Device: ', dataBuf);
        this._serialPort?.drain(error => {
          this.log.debug('Data drained');          
        });
      }
    });
  }

  public close(): void {
    this.log.trace("Closing Serial Port Adapter");
    this._serialPort?.close();
  }
}