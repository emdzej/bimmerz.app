import { IBusInterface, IBusProtocol, KNOWN_DEVICE,
    KNOWN_DEVICES} from '@bimmerz/ibus-core';

import { CDChanger, BodyModule, Radio, DisplayOperations } from '@bimmerz/ibus-device-twins';

var device = '/dev/cu.usbserial-0001';

const ibus = new IBusInterface(device, new IBusProtocol());


const radio = new Radio(ibus)
const bodyModule = new BodyModule(ibus);
const cdChanger = new CDChanger(ibus);

bodyModule.on('moduleStatusResponse', () => {
    console.log('Body module responded');
    bodyModule.requestDoorLidStatus(KNOWN_DEVICES.Radio);
});

ibus.init();
const display = new DisplayOperations(ibus);

setTimeout(() => {
    // display.displayText('Hello World');
}, 1000);
