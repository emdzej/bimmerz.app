import { arrayToHex, ConsoleLogger, createLogger, numberToHex, PinoLogger } from '@bimmerz/core';
import {
    getDeviceName,
    IBusInterface, IBusMessage, IBusProtocol, KNOWN_DEVICE,
    KNOWN_DEVICES
} from '@bimmerz/bus';
import { SerialPortAdapter } from '@bimmerz/bus';
import { IBusProtocolNode } from '@bimmerz/bus';
import { parseArgs } from "node:util";
import mqtt from "mqtt";
import { MqttAdapter } from "@bimmerz/mqtt-core";
import { handleTerminate } from '@bimmerz/cli-core';
import pino from 'pino';
import { COMMAND, getCommandName, parseCommand } from '@bimmerz/commands';

const logger = createLogger(ConsoleLogger, "IBUS MQTT Bridge", "info");

const { values, positionals } = parseArgs({
    args: process.argv,
    options: {
        host: {
            type: 'string',
            short: 'h',
        },
        user: {
            type: 'string',
            short: 'u',
        },
        password: {
            type: 'string',
            short: 'p',
        },
        output: {            
            type: 'string',
            short: 'o',
            default: 'data.log',
        },
        btopic: {            
            type: 'string',
            short: 'b',
            default: 'ibus',
        }
    },
    strict: true,
    allowPositionals: true,
});

if (values.host === undefined) {
    logger.info("Usage: ibus-mqtt-bridge -h <mqtt-host>");
    process.exit(1);
}
const transport = pino.transport({
    target: 'pino/file',
    options: { 
        destination: values.output, 
        append: false 
    }
  })
const dataLogger = pino(transport);


logger.info("Starting IBUS MQTT Logger");
logger.info(`Connecting to MQTT broker at: ${values.host}`);


const publishTopic = `${values.btopic}/rx`;

logger.info("Using bus topics: RX:", publishTopic);

const client = mqtt.connect(`mqtt://${values.host}`);

client.on('connect', () => {
    logger.info("Connected to MQTT broker");    
    client.subscribe(publishTopic, (err) => {
        if (err) {
            throw new Error(`Error subscribing to ${publishTopic}`);
        }
    });
});

client.on('message', (topic, message) => {
    const data = JSON.parse(message.toString()) as IBusMessage;
    logger.info(
        numberToHex(data.source) + " " +
        numberToHex(data.length!) + " " +
        numberToHex(data.destination) + " " +
        arrayToHex(data.payload) + " " +
        numberToHex(data.checksum!)
    );
    logger.info(
     `${getDeviceName(data.source)}[${data.source.toString(16)}] -> ${getDeviceName(data.destination)}[${data.destination.toString(16)}]: ${getCommandName(data.payload[0] as COMMAND)}[${data.payload[0].toString(16)}]`
    );    
    logger.info("Parsed output: ", parseCommand(data, logger));
    dataLogger.info(data);
});

function terminate(reason: string) {
    logger.info(`Received termination signal ${reason} , cleaning up...`);
    client.end();    
    logger.info("Done.")
    process.exit();
}

handleTerminate(terminate);