// import { IBusInterface, IBusProtocol, KNOWN_DEVICE,
//     KNOWN_DEVICES} from '@bimmerz/ibus';

import { BluetoothProximitySensor } from "./features/keyless-entry/bt-senser";

// import { CDChanger, BodyModule, Radio, DisplayOperations, VolumeOperations, VOLUME_CHANGE_DIRECTIONS, MultiFuncionSteeringWheel } 
//     from '@bimmerz/devices';

// var device = '/dev/cu.usbserial-0001';

// const ibus = new IBusInterface(device, new IBusProtocol());


// const radio = new Radio(ibus)
// const bodyModule = new BodyModule(ibus);
// const cdChanger = new CDChanger(ibus);
// const wheel = new MultiFuncionSteeringWheel(ibus);

// bodyModule.on('moduleStatusResponse', () => {
//     console.log('Body module responded');
//     bodyModule.requestDoorLidStatus(KNOWN_DEVICES.RADIO);
// });

// ibus.init();
// const display = new DisplayOperations(ibus);
// const volume = new VolumeOperations(ibus);

// setTimeout(() => {
//     wheel.announce(KNOWN_DEVICES.RADIO);
//     setInterval(() => {
//         volume.changeVolume(VOLUME_CHANGE_DIRECTIONS.UP, 0x01, KNOWN_DEVICES.RADIO);
//     }, 5000);
// }, 1000);

