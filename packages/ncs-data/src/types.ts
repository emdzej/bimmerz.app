export type DataFrame = {
    length: number;
    type: FRAME_TYPE;
    payload: Buffer;
    checksum: number;
}

export const KNOWN_FRAME_TYPES = {
    SIGNATURE1: 0x0100,
    SIGNATURE2: 0x0200,
    ID_NAME_DEFINITIONS: 0x0300,
    DATA_FORMAT_DEFINITIONS: 0x0400,
    DATA_NAMES_DEFINITIONS: 0x0500,    
    DIVIDER: 0xFF00
} as const;

export type KNOWN_FRAME_TYPE = typeof KNOWN_FRAME_TYPES[keyof typeof KNOWN_FRAME_TYPES];
export type FRAME_TYPE = KNOWN_FRAME_TYPE | number;

export type DataDefinition = {
    id: number;
    name: string;
}

export const DATA_TYPES = {
    BITWISE_OPERATION: "A",
    BYTE: "B",
    LONG_WORD: "L",
    STRING: "S",
    WORD: "W"
} as const;

export type DATA_TYPE = typeof DATA_TYPES[keyof typeof DATA_TYPES];

export type FieldType = {
    type: DATA_TYPE;    
    optional?: boolean;
    collection?: boolean;    
    collectionSize?: number;
    range?: boolean;
}

export type FieldName = {
    name: string;
}

export type FieldDefinition = Partial<DataDefinition & FieldType & FieldName>;

export type Field<T = any> = Partial<{
    definition: FieldDefinition;
    value: T;
}>;

export type DataValues = Record<string, any>;

export type DataBlock = Partial<DataDefinition & {
    fields: FieldDefinition[];
    values: DataValues[];
}>

export type DataFile = DataBlock[];
