import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, DEVICE, KNOWN_DEVICES, IBusInterface, IBusMessage } from "@bimmerz/ibus";
import { DeviceTwin } from "../device-twin";
import logger, { Logger, LoggerOptions } from 'pino';
import { DeviceEvents, DeviceEventHandler } from "../types";
import { LightControlModuleEvents } from "./events";
import { CODING_INDEX_OFFSET,
    LME38_DIMMER_OFFSET,
    LOAD_FRONT_OFFSET,
    LOAD_REAR_OFFSET,
    PHOTO_OFFSET,
    DIMMER_OFFSET,
     DIAGNOSTIC_INDEX_OFFSSET, ERROR_STATUSES, LIGHT_CHECK_STATUS_BITS, LIGHT_CONTROL_MODULE_COMMANDS, LIGHT_MODULE_VARIANT, LIGHT_MODULE_VARIANTS, LIGHT_STATUS, LIGHT_STATUSES, LIGHT_STATUS_BITS, LigthStatus } from "./types";
import { checkBit } from "utils";

export declare interface LightControlModule  {    
    on<K extends keyof LightControlModuleEvents>(name: K, listener: DeviceEventHandler<LightControlModuleEvents[K]>): this;
    emit<K extends keyof LightControlModuleEvents>(name: K, event: LightControlModuleEvents[K]): boolean;    
}

export class LightControlModule extends DeviceTwin {
    private _lightStatus: LigthStatus = {
        rapidBlink: LIGHT_STATUSES.OFF,
        turnRight: LIGHT_STATUSES.OFF,
        turnLeft: LIGHT_STATUSES.OFF,
        fogRear: LIGHT_STATUSES.OFF,
        fogFront: LIGHT_STATUSES.OFF,
        highBeam: LIGHT_STATUSES.OFF,
        lowBeam: LIGHT_STATUSES.OFF,
        parking: LIGHT_STATUSES.OFF,
        licensePlateCheck: ERROR_STATUSES.OK,
        turnRightCheck: ERROR_STATUSES.OK,
        turnLeftCheck: ERROR_STATUSES.OK,
        fogRearCheck: ERROR_STATUSES.OK,
        fogFrontCheck: ERROR_STATUSES.OK,
        highBeamCheck: ERROR_STATUSES.OK,
        lowBeamCheck: ERROR_STATUSES.OK,
        parkingCheck: ERROR_STATUSES.OK,
    }

    public get lightStatus(): Readonly<LigthStatus> {
        return this._lightStatus;
    }

    private _variant?: LIGHT_MODULE_VARIANT;

    public get variant(): LIGHT_MODULE_VARIANT | undefined {
        return this._variant;
    }

    private _dimmerVoltage?: number;

    public get dimmerVoltage(): number | undefined {
        return this._dimmerVoltage;
    }

    private _frontLoadVoltage?: number;

    public get frontLoadVoltage(): number | undefined {
        return this._frontLoadVoltage;
    }

    private _rearLoadVoltage?: number;

    public get rearLoadVoltage(): number | undefined {
        return this._rearLoadVoltage;
    }

    private _photoVoltage?: number;

    public get photoVoltage(): number | undefined {
        return this._photoVoltage;
    }

    constructor(ibusInterface: IBusInterface) {
        super(KNOWN_DEVICES.LIGHT_CONTROL_MODULE, 'Light Control Module', ibusInterface, logger({ name: 'LCM', level: 'debug' }));

        this.handle(LIGHT_CONTROL_MODULE_COMMANDS.DIAGNOSTIC_REQUEST, (message: IBusMessage) => this.handleDiagnosticRequest(message));
        this.handle(LIGHT_CONTROL_MODULE_COMMANDS.DIAGNOSTIC_RESPONSE, (message: IBusMessage) => this.handleDiagnosticResponse(message));
        this.handle(LIGHT_CONTROL_MODULE_COMMANDS.LIGHT_STATUS_REQUEST, (message: IBusMessage) => this.handleLightStatusRequest(message));
        this.handle(LIGHT_CONTROL_MODULE_COMMANDS.LIGHT_STATUS_RESPONSE, (message: IBusMessage) => this.handleLightStatusResponse(message));
        this.handle(LIGHT_CONTROL_MODULE_COMMANDS.DIMMER_STATUS, (message: IBusMessage) => this.handleDimmerStatus(message));
    }

    private handleDiagnosticResponse(message: IBusMessage): void {
        if (message.length == 0x0F) {
            // based on BlueMod
            this._variant = this.determineLightModuleVariant(message);
            this.log.debug({ variant: this._variant }, 'Light module variant detected');
        } else if (message.length == 0x19) {
            // LME38 has unique status. It's shorter, and different mapping.
            // Length is an (educated) guess based on number of bytes required to
            // populate the job results.
            this._dimmerVoltage = message.payload[LME38_DIMMER_OFFSET];
        } else if (message.length == 0x23) {
             // Front load sensor voltage (Xenon)
            this._frontLoadVoltage = message.payload[LOAD_FRONT_OFFSET];
            // Dimmer (58G) voltage
            this._dimmerVoltage = message.payload[DIMMER_OFFSET];
            // Rear load sensor voltage (Xenon) / manual vertical aim control (non-Xenon)
            this._rearLoadVoltage = message.payload[LOAD_REAR_OFFSET];            
            // Photosensor voltage (LSZ)
            this._photoVoltage = message.payload[PHOTO_OFFSET];
        }        
        this.emit('diagnosticResponse', {
            variant: this._variant,
            dimmerVoltage: this._dimmerVoltage,
            frontLoadVoltage: this._frontLoadVoltage,
            rearLoadVoltage: this._rearLoadVoltage,
            photoVoltage: this._photoVoltage,            
        });
    }

    private determineLightModuleVariant(message: IBusMessage): LIGHT_MODULE_VARIANT | undefined {
        const diagnosticIndex = message.payload[DIAGNOSTIC_INDEX_OFFSSET];
        const codingIndex = message.payload[CODING_INDEX_OFFSET];
        var variant: LIGHT_MODULE_VARIANT | undefined;
        if (diagnosticIndex < 0x10) {
            variant = LIGHT_MODULE_VARIANTS.LME38;            
        } else if (diagnosticIndex == 0x10) {            
            variant = LIGHT_MODULE_VARIANTS.LCM;
        } else if (diagnosticIndex == 0x11) {
            variant = LIGHT_MODULE_VARIANTS.LCM_A;
        } else if (diagnosticIndex == 0x12 && codingIndex == 0x16) {
            variant = LIGHT_MODULE_VARIANTS.LCM_II;
        } else if (
            (diagnosticIndex == 0x12 && codingIndex == 0x17) 
            ||
            diagnosticIndex == 0x13
        ) {
            variant = LIGHT_MODULE_VARIANTS.LCM_III;
        } else if (diagnosticIndex == 0x14) {
            variant = LIGHT_MODULE_VARIANTS.LCM_IV;
        } else if (diagnosticIndex >= 0x20 && diagnosticIndex <= 0x2f) {
            variant = LIGHT_MODULE_VARIANTS.LSZ;
        } else if (diagnosticIndex == 0x30) {
            variant = LIGHT_MODULE_VARIANTS.LSZ_2;
        }
        return variant;
    }

    public requestLightStatus(source: DEVICE): void {
        const payload = Buffer.from([LIGHT_CONTROL_MODULE_COMMANDS.LIGHT_STATUS_REQUEST]);
        const message: IBusMessage = {
            source,
            destination: this.deviceAddress,
            payload
        };
        this.ibusInterface.sendMessage(message);
    };

    private handleLightStatusRequest(message: IBusMessage): void {
        this.emit('lightStatusRequest', {
            source: message.source,
            destination: message.destination,
        });
    }

    private handleLightStatusResponse(message: IBusMessage): void {
        const statuses = message.payload[DATA_BYTE_1_INDEX];
        const errors = message.payload[DATA_BYTE_2_INDEX];
        const lightStatus: LigthStatus = {
            rapidBlink: checkBit(statuses, LIGHT_STATUS_BITS.TURN_RAPID),
            turnRight: checkBit(statuses, LIGHT_STATUS_BITS.TURN_RIGHT),
            turnLeft: checkBit(statuses, LIGHT_STATUS_BITS.TURN_LEFT),
            fogRear: checkBit(statuses, LIGHT_STATUS_BITS.FOG_REAR),
            fogFront: checkBit(statuses, LIGHT_STATUS_BITS.FOG_FRONT),
            highBeam: checkBit(statuses, LIGHT_STATUS_BITS.HIGH_BEAM),
            lowBeam: checkBit(statuses, LIGHT_STATUS_BITS.LOW_BEAM),
            parking: checkBit(statuses, LIGHT_STATUS_BITS.PARKING),
            licensePlateCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.LICENSE_PLATE),
            turnRightCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.TURN_RIGHT),
            turnLeftCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.TURN_LEFT),
            fogRearCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.FOG_REAR),
            fogFrontCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.FOG_FRONT),
            highBeamCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.HIGH_BEAM),
            lowBeamCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.LOW_BEAM),
            parkingCheck: checkBit(errors, LIGHT_CHECK_STATUS_BITS.PARKING),
        };
        this._lightStatus = lightStatus;
        this.emit('lightStatusResponse', {
            lightStatus
        });
    }

    private handleDimmerStatus(message: IBusMessage): void {

        this.emit('dimmerStatus', {
            source: message.source,
            destination: message.destination,
        });
    }
        
    private handleDiagnosticRequest(message: IBusMessage): void {
        this.emit('diagnosticRequest', {
            source: message.source,
            destination: message.destination,
        });
    }
}