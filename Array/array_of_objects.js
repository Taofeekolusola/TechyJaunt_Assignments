//creating an array of objects
let students = [
    {name: "John Doe", age: 45, grade: 4.7},
    {name: "Jin Dogh", age: 35, grade: 4.8},
    {name: "James Daniel", age: 28, grade: 4.5},
    {name: "Joe David", age: 26, grade: 3.5},
    {name: "Jee Dee", age: 30, grade: 3.2}
]

//A function that takes an array and a grade and returns a new array based on the grade searched
function filterByGrade(array, grade) {
    let newArray = []
    for(let i = 0; i < array.length; i++){
       if (array[i].grade === grade){
        newArray.unshift(array[i])
        }
    }
    return newArray;
}

console.log(filterByGrade(students, 3.2))