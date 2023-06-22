import * as ds from "@devicescript/core";
import { ConsoleLogger } from "./logging";
import { IBusProtocolDevice } from "./protocol";
import { SerialAdapter } from "./adapter";
import { createLogger } from "@bimmerz/core";
import { IBusInterface } from "@bimmerz/ibus";

const protocol = new IBusProtocolDevice(createLogger(ConsoleLogger, "IBusProtocol"));
const adapter = new SerialAdapter(protocol, createLogger(ConsoleLogger, "SerialAdapter"));
 const bus = new IBusInterface(adapter, createLogger(ConsoleLogger, "IBusInterface"));

setInterval(() => {
    console.debug(":)")
}, 1000)
