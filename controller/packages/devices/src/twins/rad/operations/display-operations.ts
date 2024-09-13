import { Logger } from "@bimmerz/core";
import { KNOWN_DEVICES, IBusInterface } from "@bimmerz/bus";
import { DeviceOperations } from "../../../devices";
import { buildDisplayText } from "@bimmerz/commands";

export class DisplayOperations extends DeviceOperations {
    constructor(ibusInterface: IBusInterface, logger: Logger) {
        super(ibusInterface, logger);
    }

    public displayText(text: string): void {
        this.ibusInterface.sendMessage(
            buildDisplayText({ text })  
        );        
    }
}