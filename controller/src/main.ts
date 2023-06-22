import { IBusInterface, IBusProtocol, KNOWN_DEVICE,
    KNOWN_DEVICES} from '@bimmerz/ibus';

import { SerialPortAdapter } from '@bimmerz/bus-os-serial';
import { IBusProtocolNode } from '@bimmerz/ibus-protocol-node';

import { BluetoothProximitySensor } from "./features/keyless-entry/bt-senser";

import { CDChanger, BodyModule, Radio, DisplayOperations, VolumeOperations, VOLUME_CHANGE_DIRECTIONS, MultiFuncionSteeringWheel } 
    from '@bimmerz/devices';
import { createLogger } from '@bimmerz/core';

import { PinoLogger } from "@bimmerz/logging-pino";

var device = '/dev/cu.usbserial-0001';

const logger = createLogger(PinoLogger, "IBUS", "info");
const protocol = new IBusProtocolNode(logger);

const adapter = new SerialPortAdapter(protocol, device, logger);

const ibus = new IBusInterface(adapter, logger);


const radio = new Radio(ibus, createLogger(PinoLogger, "Radio"));
const bodyModule = new BodyModule(ibus, createLogger(PinoLogger, "BodyModule"));
const cdChanger = new CDChanger(ibus, createLogger(PinoLogger, "CDChanger"));
const wheel = new MultiFuncionSteeringWheel(ibus, createLogger(PinoLogger, "MultiFuncionSteeringWheel"));

bodyModule.on('moduleStatusResponse', () => {
    console.log('Body module responded');
    bodyModule.requestDoorLidStatus(KNOWN_DEVICES.RADIO);
}, undefined);


const display = new DisplayOperations(ibus, createLogger(PinoLogger, "DisplayOperations"));
const volume = new VolumeOperations(ibus, createLogger(PinoLogger, "VolumeOperations"));

// setTimeout(() => {
//     wheel.announce(KNOWN_DEVICES.RADIO);
//     setInterval(() => {
//         volume.changeVolume(VOLUME_CHANGE_DIRECTIONS.UP, 0x01, KNOWN_DEVICES.RADIO);
//     }, 5000);
// }, 1000);

