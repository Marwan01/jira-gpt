export interface Constraint<T> {
    readonly description: string;
    isValid(value: T): boolean;
}
export declare class LengthConstraint implements Constraint<string> {
    readonly min: number;
    readonly max: number;
    constructor(min: number, max: number);
    get description(): string;
    isValid(value: string): boolean;
}
export declare class RegexConstraint implements Constraint<string> {
    readonly regex: RegExp;
    constructor(regex: RegExp);
    get description(): string;
    isValid(value: string): boolean;
}
export interface ValidationError {
    toString(): string;
}
export declare class GeneralValidationError implements ValidationError {
    private readonly error;
    constructor(error: string);
    toString(): string;
}
export declare class ConstraintViolation<T> implements ValidationError {
    readonly fieldName: string;
    readonly value: T;
    readonly constraints: Constraint<T>[];
    constructor(fieldName: string, value: T, constraints: Constraint<T>[]);
    toString(): string;
}
export declare function lengthBetween(min: number, max: number): LengthConstraint;
export declare function pattern(regex: RegExp): RegexConstraint;
export declare function validateField<O, T extends keyof O>(object: O, fieldName: T, constraints: Constraint<O[T]>[]): ConstraintViolation<O[T]> | undefined;
//# sourceMappingURL=constraints.d.ts.map