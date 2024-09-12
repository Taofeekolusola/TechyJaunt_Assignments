// console.log('one')
// const delay = Date.now() + 2000;

// const delayFuncion = () => {
//     console.log('two')
// }

//     while(Date.now() < delay) {
//         // do nothing
//     }
// delayFuncion();
// console.log('three')

// console.log('one')
// setTimeout(() => {
//     console.log('two')
// }, 2000)
// console.log('three')

const come = () => {
    console.log('come home')
    setTimeout(() => {
        console.log('After leaving come to school')
    }, 1000)
    console.log('leave home')
}

come()