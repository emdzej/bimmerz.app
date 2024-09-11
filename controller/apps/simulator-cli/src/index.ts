import { ConsoleLogger, createLogger, PinoLogger } from '@bimmerz/core';
import {
    IBusInterface, IBusMessageBuilder, IBusProtocol, KNOWN_DEVICE,
    KNOWN_DEVICES
} from '@bimmerz/bus';
import { SerialPortAdapter } from '@bimmerz/bus';
import { IBusProtocolNode } from '@bimmerz/bus';
import { parseArgs } from "node:util";
import mqtt from "mqtt";
import { MqttAdapter } from "@bimmerz/mqtt-core";
import { handleTerminate } from '@bimmerz/cli-core';

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
        ctopic: {            
            type: 'string',
            short: 'c',
            default: 'controller',
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

logger.info("Starting IBUS MQTT Controller");
logger.info(`Connecting to MQTT broker at: ${values.host}`);

const transmitTopic = `${values.btopic}/tx`;
const publishTopic = `${values.btopic}/rx`;

logger.info("Using bus topics: RX:", publishTopic, "TX:", transmitTopic);
logger.info("Using controller topic root:", values.ctopic);

const client = mqtt.connect(`mqtt://${values.host}`);

client.on('connect', () => {
    logger.info("Connected to MQTT broker");
    client.subscribe(`${values.ctopic}/#`, (err) => {
        if (err) {
            throw new Error(`Error subscribing to ${transmitTopic}`);
        }
    });
});

const operations: Partial<Record<keyof typeof KNOWN_DEVICES, Record<string, IBusMessageBuilder<any>>>> = {
    
}

const bus: { [key: string]: (route: string[], message: Buffer) => void } = {
    "send": (route: string[], message: Buffer) => {       
        logger.info("Sending message to IBUS:", message); 
        client.publish(transmitTopic, message);
    }
}

const systems: { [key: string]: (route: string[], message: Buffer) => void } = {
    "bus": (route: string[], message: Buffer) => {
        const [operation, ...rest] = route;
        if (bus.hasOwnProperty(operation)) {
            logger.info("Routing handing to bus operation:", operation);
            bus[operation](rest, message);
        } else {
            logger.warn("Unknown bus operation:", operation);
        }
    },
    "devices": (route: string[], message: Buffer) => {
    }
}


client.on('message', (topic, message) => {
    const [prefix, system, ...rest] = topic.split('/');
    if (prefix !== values.ctopic) {
        return;
    }
    logger.trace("Received message on topic:", topic, "message:", message);
    if (systems.hasOwnProperty(system)) {
        logger.info("Rouring handing to system:", system);
        systems[system](rest, message);
    } else {
        logger.warn("Unknown system:", system);
    }    
});

// const adapter = new MqttAdapter(client, {    
//     txTopic: transmitTopic,
//     rxTopic: publishTopic    
// }, logger);


// const ibus = new IBusInterface(adapter, logger);

// ibus.on("message", (ctx, message) => {
//     logger.info('Received IBUS message:', message);    

// }, undefined);


function terminate(reason: string) {
    logger.info(`Received termination signal ${reason} , cleaning up...`);
    client.end();    
    logger.info("Done.")
    process.exit();
}

handleTerminate(terminate);