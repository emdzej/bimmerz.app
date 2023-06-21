import { EventEmitter } from "@bimmerz/core";

export type BusAdapterEvents = {
};

export abstract class BusAdapter extends EventEmitter<BusAdapterEvents> {
};