import { splice } from "./utils";

export type Listener<T, C = any> = {
    (context: C, event: T): void;
}

export type ListenerMapEntry<K extends keyof TEvents, TEvents, C = any> = {
    context: C;
    listener: Listener<TEvents[K], C>;
}

type ListenerMap<K extends keyof TEvents, TEvents, C = any> = Partial<Record<K, ListenerMapEntry<K, TEvents, C>[] | undefined>>;

// Pure event emitter implementation
export class EventEmitter<TEvents, C = any> {
    private readonly listeners: ListenerMap<keyof TEvents, TEvents, C> = {};
    private readonly listenersOnce: ListenerMap<keyof TEvents, TEvents, C> = {};

    private getListeners(name: keyof TEvents): ListenerMapEntry<keyof TEvents, TEvents, C>[] {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        return this.listeners[name] as ListenerMapEntry<keyof TEvents, TEvents, C>[];
    }

    private getListenersOnce(name: keyof TEvents): ListenerMapEntry<keyof TEvents, TEvents, C>[] {
        if (!this.listenersOnce[name]) {
            this.listenersOnce[name] = [];
        }
        return this.listenersOnce[name] as ListenerMapEntry<keyof TEvents, TEvents, C>[];
    }

    public on(name: keyof TEvents, listener: Listener<TEvents[keyof TEvents], C>, context: C): void {
        this.getListeners(name).push({ context, listener });        
    }

    public once(name: keyof TEvents, listener: Listener<TEvents[keyof TEvents], C>, context: C): void {
        this.getListenersOnce(name).push({ context, listener });
    }


    public emit(name: keyof TEvents, event: TEvents[keyof TEvents]): void {
        if (this.listeners[name]) {
            const listeners = this.listeners[name] as ListenerMapEntry<keyof TEvents, TEvents, C>[];
            listeners.forEach((entry) => entry.listener(entry.context, event));
        }

        if (!this.listenersOnce[name]) { return; }

        const listeners = this.listenersOnce[name] as ListenerMapEntry<keyof TEvents, TEvents, C>[];
        this.listenersOnce[name] = [];
        listeners.forEach((entry) => entry.listener(entry.context, event));
    }

    public off(name: keyof TEvents, listener: Listener<TEvents[keyof TEvents], C>): void {
        if (!this.listeners[name]) { return; }
        const entries = this.listeners[name] as ListenerMapEntry<keyof TEvents, TEvents, C>[];
        const entry = entries.find((entry) => entry.listener === listener);
        if (!entry) { return; }
        const entryIndex = entries.indexOf(entry);
        if (entryIndex > -1) { splice(entries, entryIndex, 1); }
    }
}