import { SerialPort, ByteLengthParser } from 'serialport';
import { EventEmitter } from "@bimmerz/core";
import { IBusProtocol } from './protocol';
import { EventHandler, IBusMessage } from 'types';
import { getDeviceName } from './utils';
import { Logger }  from "@bimmerz/core";

export type IBusInterfaceEvents = {
  message: IBusMessage;
}
export class IBusInterface extends EventEmitter<IBusInterfaceEvents> {
    private serialPort?: SerialPort;
    private device: string;
    private readonly protocol: IBusProtocol;
    private queue: Array<Buffer> = [];
    private readonly log: Logger;
    private lastActivityTime: [number, number] = process.hrtime();

    constructor(devicePath: string, protocol: IBusProtocol, logger: Logger) {
        super();
        this.device = devicePath;
        this.protocol = protocol;
        this.lastActivityTime = process.hrtime();
        this.queue = [];
        this.log = logger;
    }
    
  sendMessage(message: IBusMessage): void {
    if (this.queue.length > 1000) {
        this.log.warn("Queue too large, dropping message", message);
        return;
    }
    this.log.debug(`Queuing message from ${getDeviceName(message.source)} to: ${getDeviceName(message.destination)}, data: ${message.payload.toString('hex')}`);        
    const buffer =  this.protocol.encodeMessage(message);    
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
        this.log.debug(`Received message from ${getDeviceName(message.source)} to: ${getDeviceName(message.destination)}, data: ${message.payload.toString('hex')}`);        
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