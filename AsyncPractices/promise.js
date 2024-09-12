// const timeIsUp = (time) => {
//     console.log('Time is running!')
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (!time) {
//                 resolve('Time is up!')
//             } else {
//                 reject('There is enough time!')
//             }
//         }, 2000)
//     })
// }

// timeIsUp(true).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// console.log('Time set successfully')

const foodIsReady = (food) => {
    console.log('Food is being prepared!')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (food) {
                resolve('Food is ready!')
            } else {
                reject(`${food} is not ready!`)
            }
        }, 1000)
    })
}

foodIsReady(true).then((result) => {
    console.log(result)
}).catch ((err) => {
    console.log('error' + err)
})

console.log('Food preparation completed successfully')

