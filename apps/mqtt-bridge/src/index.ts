import { ConsoleLogger, createLogger, LogLevel } from '@bimmerz/core';
import {
    arrayToMessage,
    IBusInterface, IBusMessage, 
    messageToArray
} from '@bimmerz/bus';
import { SerialPortAdapter } from '@bimmerz/bus';
import { IBusProtocolNode } from '@bimmerz/bus';
import { parseArgs } from "node:util";
import mqtt from "mqtt";
import { handleTerminate } from '@bimmerz/cli-core';

const { values, positionals } = parseArgs({
    args: process.argv,
    options: {
        device: {
            type: 'string',
            short: 'd',
        },
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
        topic: {
            type: 'string',
            short: 't',
            default: 'ibus',
        },
        level: {
            type: 'string',
            short: 'l',
            default: 'info',
        }
    },
    strict: true,
    allowPositionals: true,
});

const logger = createLogger(ConsoleLogger, "IBUS MQTT Bridge", values.level as LogLevel);

if (values.host === undefined || values.device === undefined) {
    logger.info("Usage: ibus-mqtt-bridge -h <mqtt-host> -p <serial-port>");
    process.exit(1);
}

logger.info("Starting IBUS MQTT Bridge");
logger.info(`Connecting to MQTT broker at: ${values.host}`);
logger.info(`Using serial device: ${values.device}`);

const transmitTopic = `${values.topic}/tx`;
const transmitRawTopic = `${values.topic}/tx/raw`;
const publishTopic = `${values.topic}/rx`;
const publishRawTopic = `${values.topic}/rx/raw`;

logger.info(`Forwarding from IBUS to MQTT on: ${publishTopic}, ${publishRawTopic}`);
logger.info(`Forwarding from MQTT to IBUS on: ${transmitTopic}, ${transmitRawTopic}`);

const client = mqtt.connect(`mqtt://${values.host}`);

client.on('connect', () => {    
    logger.info("Connected to MQTT broker");
    logger.info(`Subscribing to ${transmitTopic}, ${transmitRawTopic}`);
    client.subscribe([ transmitTopic, transmitRawTopic ], (err) => {
        if (err) {
            logger.error(`Error subscribing to ${transmitTopic}`);
        }
    });
})

client.on('message', (topic, message) => {
    logger.info(`Received message on ${topic}`);
    let data: IBusMessage;
    if (topic === transmitRawTopic) {
        data = arrayToMessage(Array.from(message));        
    } else if (topic === transmitTopic) { 
        data = JSON.parse(message.toString());    
    } else {
        logger.error(`Unknown topic: ${topic}`);
        return;
    }
    if (data) {
        logger.debug("Received data:", data);        
        ibus.sendMessage(data);
    }
});

const protocol = new IBusProtocolNode(logger);
const adapter = new SerialPortAdapter(protocol, values.device!, logger);
const ibus = new IBusInterface(adapter, logger);

ibus.on("message", (ctx, message) => {
    logger.debug("Received IBUS message: ", message);
    const payload = JSON.stringify(message);        
    logger.debug(`Publishing data: ${payload}`);
    client.publish(publishTopic, payload);
    const rawPayload = Buffer.from(messageToArray(message));
    client.publish(publishRawTopic, rawPayload);
}, undefined);


function terminate(reason: string) {
    logger.info(`Received termination signal ${reason} , cleaning up...`);
    client.end();
    adapter.close();
    logger.info("Done.")
    process.exit();
}

handleTerminate(terminate);