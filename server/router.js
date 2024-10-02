const express = require('express')
const router = express.Router()

const users = []

router.get('/', (req, res) => {
    res.status(200).json(users)
})

router.post('/', (req, res) => {
    const user = req.body
    if (user) {
        users.push(user)
        res.status(201).json(user)
    } else {
        res.status(400).json({ message: 'Invalid user data' })
    }
})

router.put('/:age', (req, res) => {
    const userAge = parseInt(req.params.age)
    if(typeof(userAge) === 'number') {
        const updatedUser = req.body
        for(let i = 0; i < users.length; i++) {
            if(users[i].age === userAge) {
                users[i] = updatedUser
                res.status(200).json(users[i])
                return
            } else {
                // If no user exists with the given age, add a new user
                updatedUser.age = userAge;
                users.push(updatedUser);
                res.status(201).json(updatedUser);
            }
        }
        res.status(404).json({ message: 'User not found' })
    }
    
})

router.delete('/:age', (req, res) => {
    const userAge = parseInt(req.params.age)
    if(typeof(userAge) === 'number') {
        for(let i = 0; i < users.length; i++) {
            if(users[i].age === userAge) {
                users.splice(i, 1)
                res.status(204).send()
                return
            }
        }
        res.status(404).json({ message: 'User not found' })
    }
})

module.exports = router;