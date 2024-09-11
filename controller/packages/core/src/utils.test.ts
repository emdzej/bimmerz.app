import {
    hexToArray,
    arrayToHex
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
});