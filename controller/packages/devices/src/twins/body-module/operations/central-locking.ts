import { IBusInterface, KNOWN_DEVICES } from "@bimmerz/bus";
import { Logger } from "@bimmerz/core";
import { DiagnosticOperations } from "../../../diagnostics";
import { buildBodyModuleCentralButtonPress, buildBodyModuleLockAllDoors, buildBodyModuleLockHighSideDoors, buildBodyModuleLockLowSideDoors, buildBodyModuleUnlockAllDoors, buildBodyModuleUnlockHighSideDoors, buildBodyModuleUnlockLowSideDoors, VEHICLE_TYPE } from "@bimmerz/commands";

export class CentralLockingOperations extends DiagnosticOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(KNOWN_DEVICES.GM, ibusInterface, logger);
    }

    public pressCenterLockButton(vehicleType: VEHICLE_TYPE): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleCentralButtonPress(vehicleType)
        );       
    }

    public lockAllDoors(vehicleType: VEHICLE_TYPE): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleLockAllDoors(vehicleType)
        );        
    }

    public lockHighSideDoors(vehicleType: VEHICLE_TYPE): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleLockHighSideDoors(vehicleType)
        );        
    }

    public lockLowSideDoors(vehicleType: VEHICLE_TYPE): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleLockLowSideDoors(vehicleType)
        );        
    }

    public unllockAllDoors(vehicleType: VEHICLE_TYPE): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleUnlockAllDoors(vehicleType)
        );       
    }

    public unlockHighSideDoors(vehicleType: VEHICLE_TYPE): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleUnlockHighSideDoors(vehicleType)
        );        
    }

    public unlockLowSideDoors(vehicleType: VEHICLE_TYPE): void {
        this.ibusInterface.sendMessage(
            buildBodyModuleUnlockLowSideDoors(vehicleType)
        );        
    }    
}