import { Transform, TransformCallback, TransformOptions } from 'stream';
import { SerialPort } from 'serialport';
import { BusAdapter, IBusMessage, IBusProtocol, getDeviceName } from '@bimmerz/ibus';
import { Logger } from '@bimmerz/core';

class ProtocolTransform extends Transform {
  private readonly log: Logger;
  private _protocol: IBusProtocol;

  constructor(protocol: IBusProtocol, logger: Logger, options?: TransformOptions) {
    super(options || {});
    this.log = logger;
    this._protocol = protocol;
    this._protocol.on('message', (message: IBusMessage) => this.handleMessage(message));
  }

  private handleMessage(message: IBusMessage): any {
    this.emit('message', message);
  }

  public _flush(callback: TransformCallback): void {
    this._protocol.flush(callback);
  }

  public _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
    this._protocol.transform(chunk, callback);
  };

}

export class SerialPortAdapter extends BusAdapter {
  private _serialPort?: SerialPort;
  private _device: string;
  private _queue: Array<Buffer> = [];
  private _protocolTransform: ProtocolTransform;
  private log: Logger;
  private lastActivityTime: [number, number] = process.hrtime();
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
      this.log.debug(`Received message from ${getDeviceName(message.source)} to: ${getDeviceName(message.destination)}, data: ${message.payload.toString('hex')}`);
      this.lastActivityTime = process.hrtime();
      this.emit('message', message);
    });

    this._serialPort.on('open', () => {
      this.log.debug(`Opened ${this._device}`);

    });

    this._serialPort.open((err) => {
      if (err) {
        this.log.error(`Error opening port: ${err}`);
        return;
      }
      this.watchForEmptyBus(this.processOutGoingQueue.bind(this));
    });
  }

  public send(message: IBusMessage): void {
    if (this._queue.length > 1000) {
      this.log.warn("Queue too large, dropping message", message);
      return;
    }
    this.log.debug(`Queuing message from ${getDeviceName(message.source)} to: ${getDeviceName(message.destination)}, data: ${message.payload.toString('hex')}`);
    const buffer = this._protocol.encodeMessage(message);
    this._queue.unshift(buffer);
  }

  private getHrDiffTime(time: [number, number]) {
    // ts = [seconds, nanoseconds]
    var ts = process.hrtime(time);
    // convert seconds to miliseconds and nanoseconds to miliseconds as well
    return (ts[0] * 1000) + (ts[1] / 1000000);
  }



  private processOutGoingQueue(ready: () => void) {
    // noop on empty queue
    if (this._queue.length <= 0) {
      ready();
      return;
    }
    // process 1 message
    this.log.debug(this._queue, "Queue");
    var dataBuf = this._queue.pop();
    this._serialPort?.write(dataBuf, (error) => {
      if (error) {
        this.log.error('Failed to write: ' + error);
      } else {
        this.log.info('Wrote to Device: ', dataBuf);
        this._serialPort?.drain(error => {
          this.log.debug('Data drained');
          this.lastActivityTime = process.hrtime();
          ready();
        });
      }
    });
  }

  private watchForEmptyBus(worker: (success: () => void) => void) {
    if (this.getHrDiffTime(this.lastActivityTime) >= 20) {
      worker(() => {
        // operation is ready, resume looking for an empty bus
        setImmediate(this.watchForEmptyBus.bind(this), worker);
      });
    } else {
      // keep looking for an empty Bus
      setImmediate(this.watchForEmptyBus.bind(this), worker);
    }
  }
}