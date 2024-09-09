import { BusAdapter, IBusMessage } from "@bimmerz/bus";
import mqtt, { MqttClient } from "mqtt";
import { Logger } from "@bimmerz/core";

export type MqttAdapterOptions = {    
    txTopic: string;
    rxTopic: string;
}

export class MqttAdapter extends BusAdapter {
    
    
    public send(message: IBusMessage): void {
        if (this._client.connected) {
            this._client.publish(this._options.txTopic, JSON.stringify(message));
        }
    }

    constructor(private _client: MqttClient, private _options: MqttAdapterOptions, private _logger: Logger) {
        super();    
        this._client.subscribe(_options.rxTopic, (err) => {
            if (err) {
                throw new Error(`Error subscribing to ${_options.txTopic}`);
            }
        });        
        this._client.on('message', (topic, message) => {            
            if (topic !== _options.rxTopic) {
                return;
            }
            const payload = JSON.parse(message.toString());
            this.emit('message', payload);
        });
    }

    public close(): void {
        this._logger.trace("Closing MQTT adapter");
    }
}