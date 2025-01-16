import {
    hexToArray,
    arrayToHex,
    stringToArgv,
    hasKey,
    hasValue,
    parseMember
} from "./utils";


describe("utils", () => {
    describe("arrayToHex", () => {
        it("should convert an array to a string with hex numbers", () => {
            const data = [0x3F, 0x03, 0xC8, 0x00, 0xF4];
            const expected = "3F 03 C8 00 F4";
            const result = arrayToHex(data);
            expect(result).toEqual(expected);
        });
    });

    describe("hexToArray", () => {
        it("should convert a string with hex numbers to an array", () => {
            const data = "3F 03 C8 00 F4";
            const expected = [0x3F, 0x03, 0xC8, 0x00, 0xF4];
            const result = hexToArray(data);
            expect(result).toEqual(expected);
        });
    });

    describe("stringToArgv", () => {
        it("should convert a string to an array of arguments", () => {
            const data = "hello world";
            const expected = ["hello", "world"];
            const result = stringToArgv(data);
            expect(result).toEqual(expected);
        });

        it("should convert a string with quotes to an array of arguments", () => {
            const data = 'hey "hello world"';
            const expected = ["hey", "hello world"];
            const result = stringToArgv(data);
            expect(result).toEqual(expected);
        });

        it("should convert a string with single quotes to an array of arguments", () => {
            const data = "hey 'hello world'";
            const expected = ["hey", "hello world"];
            const result = stringToArgv(data);
            expect(result).toEqual(expected);
        });

    });

    describe("hasKey", () => {
        it("should return true, if object contains key matching the value provided", () => {
            const data = {
                key1: "value",
                key2: "value2"
            };
            
            const result = hasKey(data, "key1");
            expect(result).toEqual(true);
        });

        it("should return false, if object doesn't contain key matching the value provided", () => {
            const data = {
                key1: "value",
                key2: "value2"
            };
            
            const result = hasKey(data, "key3");
            expect(result).toEqual(false);
        });
    });

    describe("hasValue", () => {
        it("should return true, if object contains value matching the value provided", () => {
            const data = {
                key1: "value",
                key2: "value2"
            };
            
            const result = hasValue(data, "value");
            expect(result).toEqual(true);
        });

        it("should return false, if object doesn't contain value matching the value provided", () => {
            const data = {
                key1: "value",
                key2: "value2"
            };
            
            const result = hasValue(data, "value3");
            expect(result).toEqual(false);
        });
    });

    describe("parseMember", () => {
        it("should return member value, when the parsed value is valid key matching case", () => {
            const data = {
                KEY_1: 1,
                KEY_2: 2
            };
            
            const result = parseMember("KEY_1", data);
            expect(result).toEqual(1);
        });

        it("should return member value, when the parsed value is valid key but in lower case", () => {
            const data = {
                key_1: 1,
                KEY_2: 2
            };
            
            const result = parseMember("KEY_1", data);
            expect(result).toEqual(1);
        });

        it("should return member value, when the parsed value is valid key but in upper case", () => {
            const data = {
                key_id: 1,
                KEY_2: 2
            };
            
            const result = parseMember("key_2", data);
            expect(result).toEqual(2);
        });

        it("should return undefined, when the parsed value is invalid key", () => {
            const data = {
                KEY_1: 1,
                KEY_2: 2
            };
            
            const result = parseMember("key_3", data);
            expect(result).toEqual(undefined);
        });

        it("should return member value, when the parsed value is existing value", () => {
            const data = {
                KEY_1: 1,
                KEY_2: 2
            };
            
            const result = parseMember("2", data);
            expect(result).toEqual(2);
        });

        it("should return undefined, when the parsed value doesn't exist in target", () => {
            const data = {
                KEY_1: 1,
                KEY_2: 2
            };
            
            const result = parseMember("3", data);
            expect(result).toEqual(undefined);
        });
    });
});