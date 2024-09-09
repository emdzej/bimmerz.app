import { DEVICE, KNOWN_DEVICES, IBusInterface} from "@bimmerz/bus";
import { Logger } from "@bimmerz/core";
import { DeviceOperations } from "../../../devices";
import { buildMultiFunctionSteeringWheelVolumeChange, VOLUME_CHANGE_DIRECTION } from "@bimmerz/commands";

export class VolumeOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(ibusInterface, logger);
    }

    public changeVolume(direction: VOLUME_CHANGE_DIRECTION, steps: number = 0x01, target: DEVICE = KNOWN_DEVICES.RADIO): void {
        this.ibusInterface.sendMessage(
            buildMultiFunctionSteeringWheelVolumeChange({ 
                direction, 
                steps, 
                target
            })
        );
    }
}