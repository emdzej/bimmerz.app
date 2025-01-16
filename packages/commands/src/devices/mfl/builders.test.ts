import { KNOWN_DEVICES } from "@bimmerz/bus";
import { parseButtonPressArgs } from "./builders";
import {
    
} from "./parsers";
import { MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATES, MULTI_FUNCTION_STEERING_WHEEL_BUTTONS } from "./types";


describe("MFL parsers", () => {
    describe("argument parsers", () => {
        describe("parseButtonPressArgs", () => {
            it("should parse arguments by names", () => {                
                const result = parseButtonPressArgs(...["RAD", "FORWARD", "PRESS"]);
                expect(result).toEqual({
                    target: KNOWN_DEVICES.RAD,
                    button: MULTI_FUNCTION_STEERING_WHEEL_BUTTONS.FORWARD,
                    state: MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATES.PRESS
                });
            });

            it("should parse arguments by values", () => {
                const result = parseButtonPressArgs(...["104", "8", "32"]);
                expect(result).toEqual({
                    target: KNOWN_DEVICES.RAD,
                    button: MULTI_FUNCTION_STEERING_WHEEL_BUTTONS.BACK,
                    state: MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATES.RELEASE
                });
            });

            it("should parse mixed arguments (names, values)", () => {
                const result = parseButtonPressArgs(...["RAD", "1", "0"]);
                expect(result).toEqual({
                    target: KNOWN_DEVICES.RAD,
                    button: MULTI_FUNCTION_STEERING_WHEEL_BUTTONS.FORWARD,
                    state: MULTI_FUNCTION_STEERING_WHEEL_BUTTON_STATES.PRESS
                });
            });
        })
    });
});