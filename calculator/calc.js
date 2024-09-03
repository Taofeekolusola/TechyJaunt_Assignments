function calc(a, b, c = '+') {
    //ensure the values are of expected types
    if ((typeof a !== 'number' || typeof b !== 'number') || (typeof c !== 'string')) {
        throw new Error('Invalid input types');
    } else {
        // Perform basic arithmetic operations
    switch (c) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '/':
            return a / b;
        case '*':
            return a * b;
        default:
            throw new Error('Invalid operator');
        }    
    }
    
}

// Test cases
console.log(calc(5, 3)); // Output: 8
console.log(calc(10, 2, '-')); // Output: 8
console.log(calc(10, 2, '/')); // Output: 5
console.log(calc(5, 3, '*')); // Output: 15
//console.log(calc(5, 3, '%')); // Throws an error