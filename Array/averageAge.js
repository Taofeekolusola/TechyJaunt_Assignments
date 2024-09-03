let students = [
    {name: "John Doe", age: 45, grade: 4.7},
    {name: "Jin Dogh", age: 35, grade: 4.8},
    {name: "James Daniel", age: 28, grade: 4.5},
    {name: "Joe David", age: 26, grade: 3.5},
    {name: "Jee Dee", age: 30, grade: 3.2}
]

function averageAge(array) {
    let sum = 0
    //iltrate through the elements in the array
    for (let i = 0; i < array.length; i++) {
        //get the sum of the age of people in the array
        sum += array[i].age
    }
    //get the average age
    let average = sum / array.length
    return average
}

console.log(averageAge(students))