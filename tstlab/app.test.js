const {
    getApiData,
    getAverage,
    checkIfAdmin,
    filterName,
    div
} = require('./lib')

test('Divide 200 by 2', () => {
    const result = div(200, 2)
    expect(result).toBe(100);
})

test('Filter names containing "John"', () => {
    const names = ['john', 'joe']
    const result = filterName(names, 'john')
    expect(result).toEqual(['john'])
})

test('average score 3', () => {
    const result = getAverage([1,2,3,4,5])
    expect(result).toBe(3)
})

test('checks for admin', () => {
    const result = checkIfAdmin({
        name: "john",
        role: "admin"
    })
    expect(result).toBeTruthy()
})

test('check url for response', async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const response = await getApiData(url)
    const object = {"completed": false, "id": 1, "title": "delectus aut autem", "userId": 1}
    expect(response.status()).toBe(200)
})