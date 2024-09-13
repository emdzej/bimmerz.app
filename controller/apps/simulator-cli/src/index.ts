import { arrayToHex, ConsoleLogger, createLogger, hexToArray, PinoLogger, stringToArgv } from '@bimmerz/core';
import {
    arrayToMessage,
    DEVICE,
    DEVICE_SHORT_NAME,
    getDeviceName,
    IBusInterface, IBusMessageBuilder, IBusProtocol, KNOWN_DEVICE,
    KNOWN_DEVICE_NAMES,
    KNOWN_DEVICES
} from '@bimmerz/bus';
import { SerialPortAdapter } from '@bimmerz/bus';
import { IBusProtocolNode } from '@bimmerz/bus';
import { program, Command } from 'commander';
import mqtt from "mqtt";
import { MqttAdapter } from "@bimmerz/mqtt-core";
import { handleTerminate } from '@bimmerz/cli-core';
import readline from "readline";
import { stdin, stdout } from "process";
import { COMMAND, getCommandName, KNOWN_COMMAND_NAMES, parseCommand } from '@bimmerz/commands';
import { getDeviceCommands } from './device';

const logger = createLogger(ConsoleLogger, "IBUS MQTT Bridge", "info");

program
    .version('0.0.1')
    .description('IBUS Simulator CLI')
    .option('-b, --bus [bus]', 'Bus type', 'mqtt')
    .option('-h, --host [host]', 'MQTT broker host', 'localhost')
    .option('-u, --user [user]', 'MQTT broker user')
    .option('-p, --password [password]', 'MQTT broker password')
    .option('-t, --topic [topic]', 'Topic root', 'ibus')

program.parse(process.argv);

const options = program.opts();

if (options.host === undefined) {
    program.help();
    process.exit(1);
}

// logger.info("Starting IBUS MQTT Controller");
// logger.info(`Connecting to MQTT broker at: ${values.host}`);

// const transmitTopic = `${values.btopic}/tx`;
// const publishTopic = `${values.btopic}/rx`;

// logger.info("Using bus topics: RX:", publishTopic, "TX:", transmitTopic);
// logger.info("Using controller topic root:", values.ctopic);

// const client = mqtt.connect(`mqtt://${values.host}`);

// client.on('connect', () => {
//     logger.info("Connected to MQTT broker");
//     client.subscribe(`${values.ctopic}/#`, (err) => {
//         if (err) {
//             throw new Error(`Error subscribing to ${transmitTopic}`);
//         }
//     });
// });


// client.on('message', (topic, message) => {   
   
// });

// const adapter = new MqttAdapter(client, {    
//     txTopic: transmitTopic,
//     rxTopic: publishTopic    
// }, logger);


// const ibus = new IBusInterface(adapter, logger);

// ibus.on("message", (ctx, message) => {
//     logger.info('Received IBUS message:', message);    

// }, undefined);


const prompt = readline.createInterface({input: stdin, output: stdin});

const rootCommand = new Command();

let currentCommand = rootCommand;

function exitCommand() {
    currentCommand = rootCommand;
    prompt.setPrompt("> ");
}

rootCommand.command("parse <message>")
    .alias("p")
    .action((message) => {
        const ibusMessage = arrayToMessage(hexToArray(message));
        logger.info(
            `Source: ${getDeviceName(ibusMessage.source)} [ ${ibusMessage.source.toString(16)} ]`
           );    
        logger.info(
            `Destination: ${getDeviceName(ibusMessage.destination)} [ ${ibusMessage.source.toString(16)} ]`
        );    
        logger.info(
            `Command: ${getCommandName(ibusMessage.payload[0] as COMMAND)} [ ${ibusMessage.payload[0].toString(16)} ]`
        );        
        
        const result = parseCommand(
            ibusMessage,
            logger
        );

        if (result !== undefined) {
            logger.info("Data: ", result);
        } else {
            logger.info(`Data: ${arrayToHex(ibusMessage.payload.slice(1))}`);
        }        
    });

rootCommand.command("list")
    .alias("l")
    .action(() => {
        Object.keys(KNOWN_DEVICES).sort().forEach((key) => {
            const shortName = key as DEVICE_SHORT_NAME;            
            logger.info(`${key.padEnd(8, " ")} [${KNOWN_DEVICES[shortName].toString(16).padStart(2, "0")}] ${KNOWN_DEVICE_NAMES[shortName]}`);
        });
    });

rootCommand.command("describe <device>")
    .alias("d")
    .action((device) => {
        logger.info(`Describing device: ${device}`);
        //ibus.describe(device);
    });

rootCommand.command("use <device>")
    .alias("u")
    .action((device) => {
        try {
            
        const dev = device.toUpperCase();        
        if (!KNOWN_DEVICES.hasOwnProperty(dev)) {
            logger.error(`Unknown device: ${device}`);
            return;
        }
        const devId = KNOWN_DEVICES[dev as DEVICE_SHORT_NAME] as KNOWN_DEVICE;
        
        prompt.setPrompt(`${dev}> `);
        const deviceCommands = getDeviceCommands(devId, exitCommand, logger);
        currentCommand = deviceCommands;        
    } catch (err) {
        logger.error(err);
    }
    });

rootCommand.command("status")
    .alias("s")
    .action(() => {
        logger.info("Status");
        //ibus.status();
    });

rootCommand.command("exit")
    .alias("quit")
    .alias("q")
    .action(() => {
        logger.info("Exiting...");
        process.exit();
    });


rootCommand.exitOverride();








prompt.setPrompt("> ");
prompt.prompt();
prompt.on('line', (line) => {   
   const argv = stringToArgv(line);   
   try {
       currentCommand.parse(argv, {from: "user"});
   } catch (err) {
         logger.error(currentCommand.helpInformation());
    }   
   prompt.prompt();
});





function terminate(reason: string) {
    logger.info(`Received termination signal ${reason} , cleaning up...`);    
    //client.end();    
    logger.info("Done.")
    process.exit();
}

handleTerminate(terminate);