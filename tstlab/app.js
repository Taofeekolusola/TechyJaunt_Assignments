const {
    getApiData,
    getAverage,
    checkIfAdmin,
    filterName,
    div
} = require('./lib')
const names = ['John', 'Fred', 'Jeff', 'Mike']
const num = [1, 2, 3, 4, 5]
const user1 = {
    name: 'John',
    role: 'admin'
}

const user2 = {
    name: 'James',
    role: 'publisher'
}

const url1 = 'https://jsonplaceholder.typicode.com/todos/1'
console.log(div(0, 2))
console.log(filterName(names, 'John'))
console.log(getAverage(num))
console.log(checkIfAdmin(user1))
console.log(checkIfAdmin(user2))
getApiData(url1)
    .then(data => console.log(data))
    .catch(error => console.error(error))
