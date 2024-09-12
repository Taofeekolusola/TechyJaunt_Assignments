const {add, sub, div, mul, isNumber, isZero} = require('./calculate.js')

const calculate = (a, b, opr) => {
    switch (opr) {
        case '+':
            return add(a, b);
        case '-':
            return sub(a, b);
        case '*':
            return mul(a, b);
        case '/':
            if(b === 0) {
                throw new Error('Division by zero is not allowed')
            }
            return div(a, b);
        default:
            throw new Error('Invalid operator');
    }
}

console.log(calculate(5, 0,'/'))