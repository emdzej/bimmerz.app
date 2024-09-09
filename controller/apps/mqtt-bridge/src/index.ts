import { ConsoleLogger, createLogger, PinoLogger } from '@bimmerz/core';
import {
    IBusInterface, IBusProtocol, KNOWN_DEVICE,
    KNOWN_DEVICES
} from '@bimmerz/bus';
import { SerialPortAdapter } from '@bimmerz/bus';
import { IBusProtocolNode } from '@bimmerz/bus';
import { parseArgs } from "node:util";
import mqtt from "mqtt";
import { fromMqttMessage, toMqttMessage } from "@bimmerz/mqtt-core"

const logger = createLogger(ConsoleLogger, "IBUS MQTT Bridge", "debug");

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
        }
    },
    strict: true,
    allowPositionals: true,
});

if (values.host === undefined || values.device === undefined) {
    logger.info("Usage: ibus-mqtt-bridge -h <mqtt-host> -p <serial-port>");
    process.exit(1);
}

logger.info("Starting IBUS MQTT Bridge");
logger.info(`Connecting to MQTT broker at: ${values.host}`);
logger.info(`Using serial device: ${values.device}`);

const transmitTopic = `${values.topic}/tx`;
const publishTopic = `${values.topic}/rx`;

logger.info(`Forwarding from IBUS to MQTT on: ${publishTopic}`);
logger.info(`Forwarding from MQTT to IBUS on: ${transmitTopic}`);


const client = mqtt.connect(`mqtt://${values.host}`);

client.on('connect', () => {    
    logger.info("Connected to MQTT broker");
    logger.info(`Subscribing to ${transmitTopic}`);
    client.subscribe(transmitTopic, (err) => {
        if (err) {
            logger.error(`Error subscribing to ${transmitTopic}`);
        }
    });
})

client.on('message', (topic, message) => {
    logger.info(`Received message on ${topic}`);
    const data = JSON.parse(message.toString());
    logger.debug("Received data:", data);
    logger.info("Sending data to IBUS:", data);
    ibus.sendMessage(fromMqttMessage(data));
});

const protocol = new IBusProtocolNode(logger);
const adapter = new SerialPortAdapter(protocol, values.device!, logger);
const ibus = new IBusInterface(adapter, logger);

ibus.on("message", (ctx, message) => {
    logger.debug("Received IBUS message: ", message);
    const payload = JSON.stringify(toMqttMessage(message));        
    logger.debug(`Publishing data: ${payload}`);
    client.publish(publishTopic, payload);
}, undefined);

process.on('SIGINT', () => {
    logger.info("Received SIGINT, cleaning up...");    
    client.end();
    adapter.close();
    process.exit();
});