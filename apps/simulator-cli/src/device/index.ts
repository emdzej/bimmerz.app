import { KNOWN_DEVICE } from '@bimmerz/bus';
import { DEVICE_BUILDERS_REGISTRY } from '@bimmerz/commands';
import { Logger } from '@bimmerz/core';
import { DeviceTwin } from '@bimmerz/devices';
import { Command } from 'commander';


export function getDeviceCommands(device: KNOWN_DEVICE, exitCallback: () => void,
    twin: DeviceTwin,
    logger: Logger) {
    const deviceCommands = new Command();
    deviceCommands.command("list")
        .alias("l")
        .action(() => {
            logger.info(twin.actions);
        });
    deviceCommands.command("info")
        .alias("i")
        .action(() => {
            logger.info(`Device: ${device}`);
        });
    deviceCommands.command("status")
        .alias("s")
        .action(() => {
            logger.info(twin.status);
        });
    deviceCommands.command("activate")
        .alias("a")
        .action(() => {
            logger.info(`Activating: ${device}`);
            twin.activate();
        });
    deviceCommands.command("deactivate")
        .alias("d")
        .action(() => {
            logger.info(`Deactivating: ${device}`);
            twin.deactivate();
        });

    deviceCommands.command("exit")
        .alias("quit")
        .alias("q")
        .action(exitCallback);


    Object.keys(twin.actions).forEach((action) => {
        deviceCommands.command(`${action} [args...]`)
            .action((args) => {
                twin.do(action, args);
            })
    });

    deviceCommands.exitOverride();
    return deviceCommands;
};

