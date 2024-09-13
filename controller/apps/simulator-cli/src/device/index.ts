import { KNOWN_DEVICE } from '@bimmerz/bus';
import { DEVICE_BUILDERS_REGISTRY } from '@bimmerz/commands';
import { Logger } from '@bimmerz/core';
import { Command } from 'commander';


export function getDeviceCommands(device: KNOWN_DEVICE, exitCallback: () => void, logger: Logger) {
    const deviceCommands = new Command();
    deviceCommands.command("info")
        .alias("i")
        .action(() => {
            logger.info(`Device: ${device}`);
        });
    deviceCommands.command("status")
        .alias("s")
        .action(() => {
            logger.info(`Status: ${device}`);
        });
    deviceCommands.command("activate")
        .alias("a")
        .action(() => {
            logger.info(`Activating: ${device}`);
        });
    deviceCommands.command("deactivate")
        .alias("d")
        .action(() => {
            logger.info(`Deactivating: ${device}`);
        });
    deviceCommands.command("exit")
        .alias("quit")
        .alias("q")
        .action(exitCallback);
    
    if (DEVICE_BUILDERS_REGISTRY.hasOwnProperty(device)) {
        const builders = DEVICE_BUILDERS_REGISTRY[device]!;
        for (const [command, builder] of Object.entries(builders)) {            
            deviceCommands.command(`${command} [args...]`)
                .action((args) => {
                    logger.info(`Command: ${command}`, args);
                });
        }
    }

    deviceCommands.exitOverride();
    return deviceCommands;
};

