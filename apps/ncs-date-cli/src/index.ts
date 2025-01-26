import { arrayToHex, ConsoleLogger, createLogger, hexToArray, PinoLogger, stringToArgv } from '@bimmerz/core';

import { program, Command } from 'commander';

import fs from 'fs';
import { parseNcsDataFile} from '@bimmerz/ncs-data';

const logger = createLogger(ConsoleLogger, "NCS Data CLI", "info");

program
    .version('0.0.1')
    .description('NCS Data CLI')
    .requiredOption('-i, --input [input]', 'Input file')    
    .option('-o, --output [output]', 'Output file')

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
    program.help();
    process.exit(1);
}

fs.readFile(options.input, (err, data) => {
    if (err) {
        logger.error("Error reading file: %s", err.message);
        return;
    }
    const file = parseNcsDataFile(data, logger);
    if (options.output) {
        fs.writeFile(options.output, JSON.stringify(file, null, 2), (err) => {
            if (err) {
                logger.error("Error writing file: %s", err.message);
            }
        });
    } else {
        console.log(JSON.stringify(file, null, 2));
    }
});
