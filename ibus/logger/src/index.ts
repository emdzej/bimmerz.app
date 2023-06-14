import { CDChanger, IBusInterface, IBusProtocol, KNOWN_DEVICE, Radio,
    BodyModule,
    
    KNOWN_DEVICES} from '@bimmerz/ibus-core';


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


setTimeout(() => {
    bodyModule.requestStatus(KNOWN_DEVICES.Radio);
}, 1000);
