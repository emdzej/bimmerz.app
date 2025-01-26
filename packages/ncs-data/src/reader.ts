import { dataFormatDefinitionsParser, dataNamesDefinitionsParser, dataParser,  idNameDefinitionsParser } from "./parsers";
import { DataBlock, DataFile, Field, KNOWN_FRAME_TYPE, KNOWN_FRAME_TYPES } from "./types";
import { calculateCrc, Logger } from "@bimmerz/core";

export function parseNcsDataFile(buffer: Buffer, log: Logger): DataFile {
    let offset = 0;
    const result: DataFile = [];
    let currentBlock: DataBlock;
    while (offset < buffer.length) {        
        const frameStart = offset;
        const payloadSize = buffer.readUInt8(offset++);
        const frameType = buffer.readUInt16LE(offset);
        offset += 2;        
        const payload = buffer.subarray(offset, offset + payloadSize);
        offset += payloadSize;
        const crc = buffer.readUInt8(offset++);        
        const calculatedCrc = calculateCrc(buffer, frameStart, payloadSize + 3);
        if (crc !== calculatedCrc) {
            log.warn("CRC mismatch for frame starting at offset %d", frameStart);
            continue;
        }
        log.debug("Parsed frame type %d with payload size %d", frameType, payloadSize);
        switch (frameType) {
            case KNOWN_FRAME_TYPES.DIVIDER: {
                // do nothing
                log.debug("End of definitions, data follows");
                break;
            } 
            case KNOWN_FRAME_TYPES.SIGNATURE1:
            case KNOWN_FRAME_TYPES.SIGNATURE2: {
                // do nothing
                log.debug("Signature frame, ignored");
                break;
            }
            case KNOWN_FRAME_TYPES.ID_NAME_DEFINITIONS: {
                log.debug("New data block definitions")                
                const blockDefinition = idNameDefinitionsParser({ length: payloadSize, type: frameType, payload, checksum: crc });
                currentBlock = blockDefinition;
                log.debug(currentBlock, "Block definition");
                break;
            }            
            case KNOWN_FRAME_TYPES.DATA_FORMAT_DEFINITIONS: {
                const fieldDefinitions = dataFormatDefinitionsParser({ length: payloadSize, type: frameType, payload, checksum: crc });
                currentBlock!.fields = fieldDefinitions;
                log.debug(fieldDefinitions, "Field definitions");
                break
            }
            case KNOWN_FRAME_TYPES.DATA_NAMES_DEFINITIONS: {
                log.debug("Data names definitions, ends block definition of given type");
                const dataNames = dataNamesDefinitionsParser({ length: payloadSize, type: frameType, payload, checksum: crc });
                if (currentBlock!.fields?.length !== dataNames.length) {
                    for (let index = 0; index < (dataNames.length - currentBlock!.fields?.length!); index++) {
                        currentBlock!.fields?.push({});
                    }
                }

                    for (let index = 0; index < dataNames.length; index++) {
                        currentBlock!.fields![index].name = dataNames[index].name;
                    }
                
                log.debug(dataNames, "Data names");
                result.push(currentBlock!);                
                break;
            }
            default: {
                log.debug("Data frame, parsing data, frame type %d", frameType);
                const values = dataParser({ length: payloadSize, type: frameType, payload, checksum: crc }, result, log);
                const valuesBlock = result.find((block) => block.id === frameType);
                log.debug("Parsed values", values);
                if (Array.isArray(valuesBlock!.values)) {
                    valuesBlock!.values.push(values);
                } else {
                    valuesBlock!.values = [values];
                }
            }
        }

    }
    return result;
}

