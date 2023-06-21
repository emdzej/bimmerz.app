import { Logger, LoggingFunction } from "@bimmerz/core";
import logger from "pino";

export class PinoLogger implements Logger {
    public debug: LoggingFunction;
    public info: LoggingFunction;
    public warn: LoggingFunction;
    public error: LoggingFunction;
    private _logger: logger.Logger;

    constructor(name: string) {
        this._logger = logger({ name: name, level: 'debug' });
        this.debug = this._logger.debug.bind(this._logger);
        this.info = this._logger.info.bind(this._logger);
        this.warn = this._logger.warn.bind(this._logger);
        this.error = this._logger.error.bind(this._logger);
    }
}