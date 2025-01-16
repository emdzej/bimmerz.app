import {
    arrayToMessage,
    messageToArray
} from "./utils";


describe("utils", () => {
    describe("arrayToMessage", () => {
        it("should convert an array to a message", () => {
            const data = [0x3F, 0x03, 0xC8, 0x00, 0xF4];
            const expected = {
                source: 0x3F,
                length: 0x03,
                destination: 0xC8,
                payload: [0x00],
                checksum: 0xF4
            };
            const result = arrayToMessage(data);
            expect(result).toEqual(expected);
        });
    });

    describe("messageToArray", () => {
        it("should convert a message to an array", () => {
            const data = {
                source: 0x3F,
                length: 0x03,
                destination: 0xC8,
                payload: [0x00],
                checksum: 0xF4
            };
            const expected = [0x3F, 0x03, 0xC8, 0x00, 0xF4];
            const result = messageToArray(data);
            expect(result).toEqual(expected);
        });
    });
});