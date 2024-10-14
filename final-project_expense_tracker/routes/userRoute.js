const express = require('express')
const router = express.Router()
const {createUserHandler, getUserHandler, loginUserHandler} = require('../controllers/userController')
const {validateToken} = require('../middlewares/auth')
router.post('/', createUserHandler)
router.get('/:id', validateToken, getUserHandler)
router.post('/login', loginUserHandler)
module.exports = router