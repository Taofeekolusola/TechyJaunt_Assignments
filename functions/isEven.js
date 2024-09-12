const nums = [1, 2, 13, 4, 5, 26, 17, 8, 9, 10, 11]

// const isEven = (num) => {
//     const Even = [];

// for(let i = 0; i < num.length; i++) {
//     if(num[i] % 2 === 0) {
//        Even.push(num[i])
// }
// }
// return Even;
// }

// const highestNum = (numb) => {
//     let max = numb[0]
//     for(let i = 0; i > numb.length; i++) {
//         if(numb[i] > max) {
//             max = numb[i]
//         }
//     }
//     return max;
// }

// console.log(highestNum(nums))

const palindrome = (str) => {
    let lower = str.toLowerCase().replace(/\s+/g, "");
    let reversed = lower.split("").reverse().join("");
    if(lower === reversed) {
        console.log("This is a palindrome word")
    } else {
        console.log("This is not a palindrome word")
    }
}
str1 = "level"
palindrome(str1)