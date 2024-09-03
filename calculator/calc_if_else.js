//write code using if and else function

const calc = (a, b, c = '+') => {
    if ((typeof a !== 'number' || typeof b !== 'number') || (typeof c !== 'string')) {
        throw new Error('Invalid input types');
    } else {

        if (c === '+') {
            return a + b;
        } else if (c === '-') {
            return a - b;
        } else if (c === '/') {
            return a / b;
        } else if (c === '*') {
            return a * b;
        } else {
            throw new Error('Invalid operator');
        }
    }
}

// Test cases
console.log(calc("1", 3)); // Output: 8
//console.log(calc(10, '2', '-')); // Output: 8
// console.log(calc(10, 2, '/')); // Output: 5
// console.log(calc(5, 3, '*')); // Output: 15
// //console.log(calc(5, 3, '%')); // Throws an error