import { DEVICE, IBusInterface, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { Logger } from "@bimmerz/core";
import { DeviceOperations } from "../devices";
import { buildIdentityRequest, buildIOStatusRequest, buildTerminateDiagnostic, KNOWN_COMMANDS } from "@bimmerz/commands";

export abstract class DiagnosticOperations extends DeviceOperations {
    private readonly device: DEVICE;

    constructor(device: DEVICE, ibusInterface: IBusInterface, log: Logger) {
        super(ibusInterface, log);
        this.device = device;        
    }
    
    public requestIOStatus() {        
        this.ibusInterface.sendMessage(buildIOStatusRequest(this.device));
    }

    public requestIdentity() {        
        this.ibusInterface.sendMessage(buildIdentityRequest(this.device));
    }

    public terminateDiagnostics(): void {
        this.ibusInterface.sendMessage(buildTerminateDiagnostic(this.device));
    }
}
