import { IBusMessage } from "@bimmerz/bus";

export type MqttIBusMessage = Omit<IBusMessage, "payload"> & {
    payload: number[];
}

export function toMqttMessage(message: IBusMessage): MqttIBusMessage {
    return {
        ...message,
        payload: Array.from(message.payload)
    }
}

export function fromMqttMessage(message: MqttIBusMessage): IBusMessage {
    return {
        ...message,
        payload: Buffer.from(message.payload)
    }
}