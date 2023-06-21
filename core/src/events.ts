import { splice } from "./utils";

export interface Listener<T> {
    (event: T): any;
}

type ListenerMap<K extends keyof TEvents, TEvents> = Partial<Record<K, Listener<TEvents[K]>[] | undefined>>;

// Pure event emitter implementation
export class EventEmitter<TEvents> {
    private readonly listeners: ListenerMap<keyof TEvents, TEvents> = {};
    private readonly listenersOnce: ListenerMap<keyof TEvents, TEvents> = {};

    private getListeners(name: keyof TEvents): Listener<TEvents[keyof TEvents]>[] {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        return this.listeners[name] as Listener<TEvents[keyof TEvents]>[];
    }

    private getListenersOnce(name: keyof TEvents): Listener<TEvents[keyof TEvents]>[] {
        if (!this.listenersOnce[name]) {
            this.listenersOnce[name] = [];
        }
        return this.listenersOnce[name] as Listener<TEvents[keyof TEvents]>[];
    }

    public on(name: keyof TEvents, listener: Listener<TEvents[keyof TEvents]>): void {
        this.getListeners(name).push(listener);        
    }

    public once(name: keyof TEvents, listener: Listener<TEvents[keyof TEvents]>): void {
        this.getListenersOnce(name).push(listener);
    }


    public emit(name: keyof TEvents, event: TEvents[keyof TEvents]): void {
        if (this.listeners[name]) {
            const listeners = this.listeners[name] as Listener<TEvents[keyof TEvents]>[];
            listeners.forEach((listener) => listener(event));
        }

        if (!this.listenersOnce[name]) { return; }

        const listeners = this.listenersOnce[name] as Listener<TEvents[keyof TEvents]>[];
        this.listenersOnce[name] = [];
        listeners.forEach((listener) => listener(event));
    }

    public off(name: keyof TEvents, listener: Listener<TEvents[keyof TEvents]>): void {
        if (!this.listeners[name]) { return; }
        const listeners = this.listeners[name] as Listener<TEvents[keyof TEvents]>[];
        const callbackIndex = listeners.indexOf(listener);
        if (callbackIndex > -1) { splice(listeners, callbackIndex, 1); }
    }
}