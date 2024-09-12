const add = (a, b) => {
    return a + b;
}

const sub = (a, b) => {
    return a - b;
}

const mul = (a, b) => {
    return a * b;
}

const div = (a, b) => {
    return a / b;
}

const isNumber = (n) => {
    return typeof(n) === 'number'
}

const isZero = (n) => {
    if(isNumber(n)) {
        if(n === 0) {
            console.warn('This is zero')
        } else {
            console.log('This is a valid number')
        }
    } else {
        console.error('Input should be a number')
    }
}

module.exports = {add, sub, mul, div, isNumber, isZero};