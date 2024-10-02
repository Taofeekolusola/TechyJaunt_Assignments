const express = require('express')
const router = express.Router()
const {
    createUserHandler, 
    loginUserHandler, 
    getUserHandler, 
    getUsersHandler, 
    updateUserHandler, 
    deleteUserHandler 
} = require('../../controller/v1/userController.js')

const {validateToken} = require('../../middleware/auth.js')

router.get('/', getUsersHandler);
router.post('/', createUserHandler)
router.put('/:id', validateToken, updateUserHandler)
router.delete('/:id', deleteUserHandler)
router.get('/:id', getUserHandler)
router.post('/login', loginUserHandler)

module.exports = router;