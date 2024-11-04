const express = require('express')
const router = express.Router()
const {getUserProfile,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
    loginUserProfile
} = require('../controllers/userController')
const {validateToken} = require('../middleware/authentication')

router.post('/profile', createUserProfile)
router.get('/profile/:id', validateToken, getUserProfile)
router.put('/profile/:id', validateToken, updateUserProfile)
router.delete('/profile/:id', validateToken, deleteUserProfile)
router.post('/login', loginUserProfile)
module.exports = router