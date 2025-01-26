export type StringLength<T extends string, L extends number[] = []> =
    T extends `${string}${infer R}`
        ? StringLength<R, [...L, 0]>
        : L["length"];

export type CompareNumbers<A extends number, B extends number, C extends number[] = []> =        
    A extends B
    ? "equal"
    : C["length"] extends A
        ? "less"
        : C["length"] extends B
            ? "greater"
            : CompareNumbers<A, B, [...C, 0]>;

export type MaxStringLength<T extends string, L extends number> =
    CompareNumbers<StringLength<T>, L> extends "less" | "equal" ? T : never;
        
export type MinStringLength<T extends string, L extends number> =
    CompareNumbers<StringLength<T>, L> extends "greater" | "equal" ? T : never;

export type ExactStringLength<T extends string, L extends number> =
    CompareNumbers<StringLength<T>, L> extends "equal" ? T : never;

export type StringLengthBetween<T extends string, Min extends number, Max extends number> =
    MinStringLength<T, Max> & MaxStringLength<T, Min>;
    
declare const __type: unique symbol;

export type Typed<T, Type> = T & {[__type]: Type};