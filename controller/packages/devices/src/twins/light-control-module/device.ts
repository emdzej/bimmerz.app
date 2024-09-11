import { DATA_BYTE_1_INDEX, DATA_BYTE_2_INDEX, DEVICE, KNOWN_DEVICES, IBusInterface, IBusMessage } from "@bimmerz/bus";
import { DeviceTwin } from "../device-twin";
import { LightControlModuleEvents } from "./events";
import { Logger, checkBit } from "@bimmerz/core";
import { LigthStatus, LIGHT_STATUSES, ERROR_STATUSES, LIGHT_MODULE_VARIANT, LME38_DIMMER_OFFSET, LOAD_FRONT_OFFSET, DIMMER_OFFSET, LOAD_REAR_OFFSET, PHOTO_OFFSET, DIAGNOSTIC_INDEX_OFFSSET, CODING_INDEX_OFFSET, LIGHT_MODULE_VARIANTS, LIGHT_STATUS_BITS, LIGHT_CHECK_STATUS_BITS, KNOWN_COMMANDS, parseLightControlModuleDiagnosticResponse, buildLightControlModuleLightStatusRequest, parseLightControlModuleLightStatusResponse } from "@bimmerz/commands";

export class LightControlModule extends DeviceTwin<LightControlModuleEvents> {
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

    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.LCM, 'Light Control Module', ibusInterface, logger);

        this.handle(KNOWN_COMMANDS.VC, (message: IBusMessage) => this.handleDiagnosticRequest(message));
        this.handle(KNOWN_COMMANDS.DD, (message: IBusMessage) => this.handleDiagnosticResponse(message));
        this.handle(KNOWN_COMMANDS.LIGHT_STATUS_REQUEST, (message: IBusMessage) => this.handleLightStatusRequest(message));
        this.handle(KNOWN_COMMANDS.LIGHT_STATUS_RESPONSE, (message: IBusMessage) => this.handleLightStatusResponse(message));
        this.handle(KNOWN_COMMANDS.DIMMER_STATUS, (message: IBusMessage) => this.handleDimmerStatus(message));
    }

    private handleDiagnosticResponse(message: IBusMessage): void {
        const response = parseLightControlModuleDiagnosticResponse(message);      
        this.emit('diagnosticResponse', response);
    }


    public requestLightStatus(source: DEVICE): void {
        this.ibusInterface.sendMessage(
            buildLightControlModuleLightStatusRequest(source)
        );        
    };

    private handleLightStatusRequest(message: IBusMessage): void {
        this.emit('lightStatusRequest', {
            source: message.source,
            destination: message.destination,
        });
    }

    private handleLightStatusResponse(message: IBusMessage): void {
        this._lightStatus = parseLightControlModuleLightStatusResponse(message);
        this.emit('lightStatusResponse', {
            lightStatus: this._lightStatus,
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

    protected handleModuleStatusResponse(message: IBusMessage): void {
        this.isPresent = true;
        this.emit("moduleStatusResponse", { source: message.source, destination: message.destination });
    }

    protected handleModuleStatusRequest(message: IBusMessage): void {
        this.emit("moduleStatusRequest", { source: message.source, destination: message.destination });
    }
}