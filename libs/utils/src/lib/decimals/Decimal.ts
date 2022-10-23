import { inspect } from "util";
import { DecimalConvertible } from "./DecimalConvertible";

export class Decimal {
    readonly #value: bigint;

    public constructor (value: DecimalConvertible = 0) {
        const parts: string[] = String(value).split(".").concat("");
        const [
            integerPart,
            decimalPart,
            isNegative,
        ]: [
            string,
            string,
            boolean,
        ] = Decimal.#normalizeParts(parts[0], parts[1]);

        if (!Number.isFinite(Number(integerPart)) || !Number.isFinite(Number(decimalPart))) {
            console.log(`Invalid decimal "${value}"`);

            throw new Error();
        }

        this.#value = BigInt((isNegative ? "-" : "") + integerPart + decimalPart.padEnd(Decimal.#decimals, "0").slice(0, Decimal.#decimals)) +
            BigInt((isNegative ? "-" : "") + (Decimal.#rounded && Number(decimalPart[Decimal.#decimals]) >= 5 ? "1" : "0"));
    }

    public add (operand: DecimalConvertible): Decimal {
        return decimal(Decimal.#toString(this.#value + decimal(operand).#value));
    }

    public subtract (operand: DecimalConvertible): Decimal {
        return decimal(Decimal.#toString(this.#value - decimal(operand).#value));
    }

    public multiply (operand: DecimalConvertible): Decimal {
        return Decimal.#divideRound(this.#value * decimal(operand).#value, Decimal.#shift);
    }

    public divide (operand: DecimalConvertible): Decimal {
        return Decimal.#divideRound(this.#value * Decimal.#shift, decimal(operand).#value);
    }

    public equals (operand: DecimalConvertible): boolean {
        return this.#value === decimal(operand).#value;
    }

    public greaterThan (operand: DecimalConvertible): boolean {
        return this.#value > decimal(operand).#value;
    }

    public greaterThanOrEqual (operand: DecimalConvertible): boolean {
        return this.greaterThan(operand) || this.equals(operand);
    }

    public lessThan (operand: DecimalConvertible): boolean {
        return this.#value < decimal(operand).#value;
    }

    public lessThanOrEqual (operand: DecimalConvertible): boolean {
        return this.lessThan(operand) || this.equals(operand);
    }

    public toNumber (): number {
        return Number(this.toString());
    }

    public toString (): string {
        return Decimal.#toString(this.#value);
    }

    public [inspect.custom] (): string {
        return `${this.toString()}d`;
    }

    /* *** *** *** Reiryoku Technologies *** *** *** */

    static readonly #decimals = 32;
    static readonly #rounded = true;
    static readonly #shift = BigInt(`1${"0".repeat(Decimal.#decimals)}`);

    public static abs (operand: Decimal): Decimal {
        if (operand.lessThan(0)) {
            return operand.multiply(-1);
        }

        return operand;
    }

    public static min (...operands: DecimalConvertible[]): Decimal {
        let min: Decimal = decimal(operands[0]);

        for (let i = 1; i < operands.length; ++i) {
            const operand: Decimal = decimal(operands[i]);

            if (operand.lessThan(min)) {
                min = operand;
            }
        }

        return min;
    }

    public static max (...operands: DecimalConvertible[]): Decimal {
        let max: Decimal = decimal(operands[0]);

        for (let i = 1; i < operands.length; ++i) {
            const operand: Decimal = decimal(operands[i]);

            if (operand.greaterThan(max)) {
                max = operand;
            }
        }

        return max;
    }

    static #divideRound (dividend: bigint, divisor: bigint): Decimal {
        return decimal(Decimal.#toString(dividend / divisor + (Decimal.#rounded ? dividend * 2n / divisor % 2n : 0n)));
    }

    static #toString (value: bigint): string {
        const descriptor: string = value.toString().padStart(Decimal.#decimals + 1, "0");
        const [
            integerPart,
            decimalPart,
            isNegative,
        ]: [
            string,
            string,
            boolean,
        ] = Decimal.#normalizeParts(descriptor.slice(0, -Decimal.#decimals), descriptor.slice(-Decimal.#decimals).replace(/\.?0+$/, ""));

        return `${isNegative ? "-" : ""}${integerPart}.${decimalPart}`.replace(/\.$/, "");
    }

    static #normalizeParts (integerPart: string, decimalPart: string): [ string, string, boolean, ] {
        let isNegative = false;
        let normalizedIntegerPart: string = integerPart;
        let normalizedDecimalPart: string = decimalPart;

        if (integerPart.indexOf("-") !== -1) {
            isNegative = true;
            normalizedIntegerPart = integerPart.replace("-", "");
        }

        if (decimalPart.indexOf("-") !== -1) {
            isNegative = true;
            normalizedDecimalPart = decimalPart.replace("-", "0");
        }

        return [
            normalizedIntegerPart,
            normalizedDecimalPart,
            isNegative,
        ];
    }
}

export const decimal = (value: DecimalConvertible = 0): Decimal => new Decimal(value);