import { SerialPort, ByteLengthParser } from 'serialport';
import EventEmitter from 'events';
import { IBusProtocol } from './protocol';
import logger, { Logger, LoggerOptions } from 'pino';
import { EventHandler, IBusMessage } from 'types';
import { getDeviceName } from './utils';

export type IBusInterfaceEvents = {
  message: IBusMessage;
}

export declare interface IBusInterface {
    on<K extends keyof IBusInterfaceEvents>(name: K, listener: EventHandler<IBusInterfaceEvents[K]>): this;
    emit<K extends keyof IBusInterfaceEvents>(name: K, event: IBusInterfaceEvents[K]): boolean;    
}

export class IBusInterface extends EventEmitter {
    private serialPort?: SerialPort;
    private device: string;
    private protocol: IBusProtocol;
    private queue: Array<Buffer> = [];
    private log: Logger<LoggerOptions> = logger({ name: 'IBusInterface', level: 'debug' });
    private lastActivityTime: [number, number] = process.hrtime();

    constructor(devicePath: string, protocol: IBusProtocol) {
        super();
        this.device = devicePath;
        this.protocol = protocol;
        this.lastActivityTime = process.hrtime();
        this.queue = [];
    }
    
  sendMessage(message: IBusMessage): void {
    if (this.queue.length > 1000) {
        this.log.warn("Queue too large, dropping message", message);
        return;
    }

    const buffer =  this.protocol.encodeMessage(message);
    this.log.debug(`Send message: ${buffer}`);
    this.queue.unshift(buffer);
  }

  private getHrDiffTime(time: [number, number]) {
    // ts = [seconds, nanoseconds]
    var ts = process.hrtime(time);
    // convert seconds to miliseconds and nanoseconds to miliseconds as well
    return (ts[0] * 1000) + (ts[1] / 1000000);
  }


  // implementation
  init() {
      this.serialPort = new SerialPort({
        path: this.device,
          autoOpen: false,
          baudRate: 9600,
          parity: 'even',
          stopBits: 1,
          dataBits: 8          
      });
      
      const parser = this.serialPort.pipe(this.protocol);
      
      parser.on('message', (message: IBusMessage) => {
        this.log.debug(`Received message:`, message);        
        this.lastActivityTime = process.hrtime();
        this.emit('message', message);
      });

      this.serialPort.on('open', () => {
        this.log.debug(`Opened ${this.device}`);        

      });
      
      this.serialPort.open((err) => {
        if (err) {
          this.log.error(`Error opening port: ${err}`);
          return;
        }
        this.watchForEmptyBus(this.processOutGoingQueue.bind(this));
      });
    }

    private processOutGoingQueue(ready: () => void) {
      // noop on empty queue
      if (this.queue.length <= 0) {
        ready();
        return;
      }
      // process 1 message
      this.log.debug(this.queue, "Queue");
      var dataBuf = this.queue.pop();      
      this.serialPort?.write(dataBuf, (error) => {
        if (error) {
          this.log.error('Failed to write: ' + error);
        } else {
          this.log.info('Wrote to Device: ', dataBuf);
          this.serialPort?.drain(error => {
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