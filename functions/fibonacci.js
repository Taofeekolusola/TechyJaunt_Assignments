// const fib = (n) => {
//     if(n === 0) return 0;
//     if(n === 1) return 1;
//     return fib(n-1) + fib(n-2)
// }

// console.log(fib(9))

const fibo = (n) => {
    let a = 0, b = 1, next;
    for( let i = 2; i <= n; i++) {
        next = a + b;
        a = b;
        b = next;
    }
    return n === 0? 0 : b;
}

console.log(fibo(9))