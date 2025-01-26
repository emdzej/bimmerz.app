import { arrayToHex, Logger } from "@bimmerz/core";
import { DATA_TYPE, DATA_TYPES, DataDefinition, DataFile, DataFrame, DataValues, Field, FieldName, FieldType, KNOWN_FRAME_TYPES } from "./types";


export function idNameDefinitionsParser(input: DataFrame): DataDefinition {
    const id = input.payload.readUInt16LE(0);    
    const name = input.payload.toString("ascii", 2, input.payload.length - 1);
    return {
        id, name
    };    
}

export function dataFormatDefinitionsParser(input: DataFrame): FieldType[] {
    const formatString = input.payload.toString("ascii", 0, input.payload.length - 1);
    const result: FieldType[] = [];
    let offset = 0;
    while (offset < formatString.length) {
        const char = formatString[offset++];
        if (char === '{') {
            // optional data
            const dataType = formatString[offset++];
            const terminator = formatString[offset++];
            if (terminator !== '}') {
                continue;
            }
            
            result.push({ 
                    optional: true,
                    type: dataType as DATA_TYPE
                
            });            
        } else if (char === '(') {
            const dataType = formatString[offset++];
            let terminator = formatString[offset++];
            let range = false;
            
            if (terminator === dataType) {
                range = true;
                terminator = formatString[offset++];
                result.push({ 
                    collection: true,
                    range,
                    type: dataType as DATA_TYPE                
                });  
            }

            if (terminator !== ')') {
                continue;
            }

            result.push({ 
                    collection: true,
                    range,
                    type: dataType as DATA_TYPE                
            });           
        } else {            
            result.push({                                
                    type: char as DATA_TYPE                
            }); 
        }
    }
    return result;
}

export function dataNamesDefinitionsParser(input: DataFrame): FieldName[] {
    return input.payload.toString("ascii", 0, input.payload.length - 1)
    .split(',').map((name) => ({  name }));
}

export function dataParser(input: DataFrame, context: DataFile, log: Logger): DataValues {
    let offset = 0;    
    log.debug("Parsing data block with type", input.type);
    log.debug(arrayToHex(Array.from(input.payload)));
    const block = context.find((block) => block.id === input.type);    
    if (!block) {
        log.warn("Data block with id %x not found", input.type);
        return context;
    }        
    const values: DataValues = {};    
    block.fields!.forEach((field) => {
        log.debug("Parsing field", field);
        if (field.optional) {
            const dataPresent = input.payload.readUInt8(offset++);
            if (dataPresent === 0) {             
                values[field.name!] = null;;
                return;                
            }
            const { length, value } = readValue(field.type!, input.payload, offset);
            offset += length;
            values[field.name!] = value;
        } else if (field.collection) {
            const collectionSize = input.payload.readUInt16LE(offset);
            offset += 2;
            const collection = [];
            log.debug("Parsing collection of size", collectionSize);
            for (let i = 0; i < collectionSize; i++) {
                const { length, value } = readValue(field.type!, input.payload, offset);
                offset += length;
                collection.push(value);
            }
            values[field.name!] = collection;
        } else {
            const { length, value } = readValue(field.type!, input.payload, offset);
            offset += length;
            values[field.name!] = value;
        }
    });
    return values;
}

function readValue(type: DATA_TYPE, payload: Buffer, offset: number) {
    switch (type) {
        case DATA_TYPES.BITWISE_OPERATION: {            
            return {
                length: 1,
                value: payload.readUInt8(offset)
            }
        }
        case DATA_TYPES.BYTE: {            
            return {
                length: 1,
                value: payload.readUInt8(offset)
            }
        }
        case DATA_TYPES.LONG_WORD: {            
            return {
                length: 4,
                value: payload.readUInt32LE(offset)
            }
        }
        case DATA_TYPES.STRING: {
            const stringEnd = payload.indexOf(0x00, offset);
            return {
                length: stringEnd - offset + 1,
                value: payload.toString("ascii", offset, stringEnd)
            }
            break;
        }
        case DATA_TYPES.WORD: {            
            return {
                length: 2,
                value: payload.readUInt16LE(offset)
            }        
        }    
    }
    return { length: 0, value: null };
}

