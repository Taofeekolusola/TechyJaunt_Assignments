const { add, sub, mul, div, isNumber, isZero } = require('./calculate.js');

describe('Arithmetic Operations', () => {
    test('adds 5 + 2 to equal 7', () => {
        expect(add(5, 2)).toBe(7);
    });

    test('subtracts 5 - 2 to equal 3', () => {
        expect(sub(5, 2)).toBe(3);
    });

    test('multiplies 5 * 2 to equal 10', () => {
        expect(mul(5, 2)).toBe(10);
    });

    test('divides 6 / 2 to equal 3', () => {
        expect(div(6, 2)).toBe(3);
    });

    test('divides by zero should return Infinity', () => {
        expect(div(5, 0)).toBe(Infinity);
    });
});

describe('Utility Functions', () => {
    test('should identify 5 as a number', () => {
        expect(isNumber(5)).toBe(true);
    });

    test('should identify "5" as not a number', () => {
        expect(isNumber("5")).toBe(false);
    });

    test('should identify 0 as zero', () => {
        console.warn = jest.fn(); // Mock console.warn
        isZero(0);
        expect(console.warn).toHaveBeenCalledWith('This is zero');
    });

    test('should identify non-zero number', () => {
        console.log = jest.fn(); // Mock console.log
        isZero(5);
        expect(console.log).toHaveBeenCalledWith('This is a valid number');
    });

    test('should identify non-number input', () => {
        console.error = jest.fn(); // Mock console.error
        isZero("string");
        expect(console.error).toHaveBeenCalledWith('Input should be a number');
    });
});