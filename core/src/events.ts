
export interface Listener<T> {
    (event: T): any;
}

export interface Disposable {
    dispose(): void;
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
        return this.listeners[name]!;
    }

    private getListenersOnce(name: keyof TEvents): Listener<TEvents[keyof TEvents]>[] {
        if (!this.listenersOnce[name]) {
            this.listenersOnce[name] = [];
        }
        return this.listenersOnce[name]!;
    }

    public on(name: keyof TEvents, listener: Listener<TEvents[keyof TEvents]>): Disposable {
        this.getListeners(name).push(listener);
        return {
            dispose: () => this.off(name, listener)
        };
    }

    public once(name: keyof TEvents, listener: Listener<TEvents[keyof TEvents]>): void {
        this.getListenersOnce(name).push(listener);
    }


    public emit(name: keyof TEvents, event: TEvents[keyof TEvents]): void {
        if (this.listeners[name]) {
            this.listeners[name]!.forEach((listener) => listener(event));
        }

        if (!this.listenersOnce[name]) { return; }

        const listeners = this.listenersOnce[name]!;
        this.listenersOnce[name] = [];
        listeners.forEach((listener) => listener(event));
    }


    public off(name: keyof TEvents, listener: Listener<TEvents[keyof TEvents]>): void {
        if (!this.listeners[name]) { return; }
        const callbackIndex = this.listeners[name]!.indexOf(listener);
        if (callbackIndex > -1) { this.listeners[name]!.splice(callbackIndex, 1); }
    }
}