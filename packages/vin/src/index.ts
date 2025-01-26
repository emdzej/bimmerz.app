import { ExactStringLength, Typed } from "@bimmerz/core";

type VinCharacter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type Vin = Typed<ExactStringLength<string, 17>, "Vin">;

export function isValidVin(input: string): input is Vin {
    return /^[A-Z0-9]{17}$/.test(input);
}

export function assertValidVin(input: string): asserts input is Vin {
    if (!isValidVin(input)) {
      throw new Error(`${input} is not a VIN`);
    }
  }


type BitLength = 8 | 16 | 24 | 32 | 64;

function numberToArray(data: number, bitLength: BitLength = 32): number[] {
    const result: number[] = [];
    for (let i = 0; i < bitLength; i += 8) {
        result.unshift((data >> i) & 0xFF);
    }
    return result;
}

function arrayToNumber(data: number[]): number {
    return data.reduce((acc, value) => (acc << 8) | value, 0);
}

function encodeChar(char: VinCharacter): number {
    if (char <= "9") {
        return char.charCodeAt(0) - 48;
    } else {
        return 0x0A + (char.charCodeAt(0) - 0x41);
    }
}

function decodeChar(hex: number): VinCharacter {
    if (hex <= 0x09) {
        return String.fromCharCode(hex + 48) as VinCharacter;
    } else {
        return String.fromCharCode(0x41 + (hex - 0x0A)) as VinCharacter;
    }
}


function encodeTuple(data: string, offset: number): number {
    let result = 0x000000;
    //let shift = 18;
    for (let i = 0; i < 4; i++) {
        const char = data[i + offset];                
        const hex = encodeChar(char as VinCharacter);        
        result = result | (hex << (18 - (6 * i)));
        // result = result | (hex << shift);
        // shift -= 6;
    }    
    return result;
}

function decodeTuple(data: number): string {
    let result = "";
    for (let i = 0; i < 4; i++) {
        const char = (data >> (18 - (6 * i))) & 0x3F;
        result += decodeChar(char);
    }
    return result;
}

export function encodeVin(vin: Vin): number[] {    
    const hex: number[] = [];
    hex.push(encodeChar(vin[0] as VinCharacter));
    for (let offset = 1; offset < 17; offset += 4) {        
        hex.push(...numberToArray(encodeTuple(vin, offset), 24));
    }    
    return hex;
}

export function decodeVin(data: number[]): Vin {
    if (data.length != 13) {
        throw new Error("VIN must be 13 bytes long");
    }
    let result = decodeChar(data[0]);
    for (let offset = 1; offset < 13; offset += 3) {
        result += decodeTuple(arrayToNumber(data.slice(offset, offset + 3)));
    }
    assertValidVin(result);
    return result;
}

