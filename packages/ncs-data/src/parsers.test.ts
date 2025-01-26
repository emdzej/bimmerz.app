import { 
    idNameDefinitionsParser, 
    dataNamesDefinitionsParser,
    dataFormatDefinitionsParser,
    dataParser
} from "./parsers";
import { DATA_TYPES, DataFile } from "./types";

describe("parsers", () => {
    it("idNameDefinitionsParser", () => {
        const input = {
            length: 19,
            type: 0x0003, // ignored
            payload: Buffer.from([
                0x12, 0x00, 0x50, 0x41, 0x52, 0x5A, 0x55,
                0x57, 0x45, 0x49, 0x53, 0x55, 0x4E, 0x47,
                0x5F, 0x46, 0x53, 0x57, 0x00
            ]),
            checksum: 0xFF // ignored
        };
        const actual = idNameDefinitionsParser(input);
        expect(actual).toEqual({
                id: 0x0012,
                name: "PARZUWEISUNG_FSW"
        });
    });

    it("dataNamesDefinitionsParser", () => {
        const input = {
            type: 0x0005,
            length: 56,
            payload: Buffer.from([
                0x42, 0x4C, 0x4F, 0x43, 0x4B, 0x4E, 0x52, 0x2C, 
                0x57, 0x4F, 0x52, 0x54, 0x41, 0x44, 0x52, 0x2C, 
                0x42, 0x59, 0x54, 0x45, 0x41, 0x44, 0x52, 0x2C, 
                0x46, 0x53, 0x57, 0x2C, 0x49, 0x4E, 0x44, 0x45, 
                0x58, 0x2C, 0x4D, 0x41, 0x53, 0x4B, 0x45, 0x2C, 
                0x45, 0x49, 0x4E, 0x48, 0x45, 0x49, 0x54, 0x2C, 
                0x49, 0x4E, 0x44, 0x49, 0x56, 0x49, 0x44, 0x00
            ]),
            checksum: 0xFF          
        }
        const actual = dataNamesDefinitionsParser(input);
        expect(actual).toEqual([
                { name: "BLOCKNR" },
                { name: "WORTADR" },
                { name: "BYTEADR" },
                { name: "FSW" },
                { name: "INDEX" },
                { name: "MASKE" },
                { name: "EINHEIT" },
                { name: "INDIVID" }
            ]);
    });    

    it("dataFormatDefinitionsParser", () => {
        const input = {
            type: 0x0004,
            length: 19,
            payload: Buffer.from([
                0x7B, 0x4C, 0x7D, 0x4C, 0x57, 0x57, 0x7B, 0x42,
                0x7D, 0x28, 0x42, 0x29, 0x7B, 0x42, 0x7D, 0x7B,
                0x42, 0x7D, 0x00
            ]),
            checksum: 0xFF          
        }
        const actual = dataFormatDefinitionsParser(input);
        expect(actual).toEqual([            
                { 
                    
                        type: DATA_TYPES.LONG_WORD,
                        optional: true
                    
                }, {                    
                        type: DATA_TYPES.LONG_WORD
                    
                }, {
                    
                        type: DATA_TYPES.WORD
                    
                }, {
                    
                        type: DATA_TYPES.WORD
                    
                }, {
                    
                        optional: true,
                        type: DATA_TYPES.BYTE
                    
                }, {
                    
                        colleciton: true,
                        type:  DATA_TYPES.BYTE
                    
                }, {
                    
                        optional: true,
                        type: DATA_TYPES.BYTE
                    
                }, {
                    
                        optional: true,
                        type: DATA_TYPES.BYTE
                    
                }                
            ]);
    });    

    it("dataFormatDefinitionsParser with double collection", () => {
        const input = {
            type: 0x0004,
            length: 7,
            payload: Buffer.from([
                0x57, 0x57, 0x28, 0x57, 0x57, 0x29, 0x00
                //WW(WW)
            ]),
            checksum: 0xFF          
        }
        const actual = dataFormatDefinitionsParser(input);
        expect(actual).toEqual([            
                { 
                    
                        type: DATA_TYPES.WORD,                        
                    
                }, {                    
                        type: DATA_TYPES.WORD
                    
                }, {
                        collection: true,
                        range: true,
                        type: DATA_TYPES.WORD,
                    
                }, {
                    collection: true,
                    range: true,
                    type: DATA_TYPES.WORD,
                
            }                
            ]);
    });    
   

    it("dataParser", () => {
        const input = {
            type: 0x0012,
            length: 18,
            payload: Buffer.from([
                0x00, 0x04, 0x00, 0x00, 0x00, 0x01,
                0x00, 0x5F, 0x02, 0x00, 0x01, 0x00, 0xFF, 0x01,
                0x68, 0x00
            ]),
            checksum: 0xFF          
        }
        const context: DataFile = [
            {
                id: 0x0012,
                name: "PARZUWEISUNG_FSW",
                fields: [
                    { 
                        name: "BLOCKNR", 
                        type: DATA_TYPES.LONG_WORD,
                        optional: true
                    },
                    { 
                        name: "WORTADR" ,                     
                        type: DATA_TYPES.LONG_WORD                        
                    },
                    { 
                        name: "BYTEADR",
                        type: DATA_TYPES.WORD
                    },
                    {   
                        name: "FSW",
                        type: DATA_TYPES.WORD
                    },
                    { 
                        name: "INDEX",
                        optional: true,
                        type: DATA_TYPES.BYTE
                    },
                    {   
                        name: "MASKE", 
                        collection: true,
                        type: DATA_TYPES.BYTE
                    },
                    { 
                        name: "EINHEIT",
                        optional: true,
                        type: DATA_TYPES.BYTE
                    },
                    { 
                        name: "INDIVID",
                        optional: true,
                        type: DATA_TYPES.BYTE
                    }
                ]
            }
        ]
        const actual = dataParser(input, context, console);
        expect(actual).toEqual({
            BLOCKNR: null,
            WORTADR: 4,
            BYTEADR: 1,
            FSW: 0x025F,
            INDEX: null,
            MASKE: [ 0xFF ],
            EINHEIT: 0x68,
            INDIVID: null
        });
    });

});