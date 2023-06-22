import { EventEmitter } from "./events";

type Event = {
    name: string;
}

type TestEvents = {
    test: Event;
}

class Emitter extends EventEmitter<TestEvents> {
    public emitTest(event: Event) {
        this.emit("test", event);
    }
}

test("Expect listener to be called", () => {
    const emitter = new Emitter();
    const listener = jest.fn();
    emitter.on("test", listener, this);
    emitter.emitTest({ name: "test" });    
    expect(listener).toBeCalledWith(this, { name: "test" });
});

test("Expect listener to be called once", () => {
    const emitter = new Emitter();
    const listener = jest.fn();
    emitter.once("test", listener, this);
    emitter.emitTest({ name: "test" });
    emitter.emitTest({ name: "test" });
    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith(this, { name: "test" });
});

test("Expect listener to be not called after calling off", () => {
    const emitter = new Emitter();
    const listener = jest.fn();
    emitter.on("test", listener, this);
    emitter.off("test", listener);
    emitter.emitTest({ name: "test" });
    expect(listener).not.toBeCalled();
});
