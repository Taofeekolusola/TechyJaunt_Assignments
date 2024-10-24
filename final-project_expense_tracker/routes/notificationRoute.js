const express = require('express')
const router = express.Router()
const {getUserNotificationsHandler} = require('../controllers/notificationController')
const {validateToken} = require('../middlewares/auth')

router.get('/user', validateToken, getUserNotificationsHandler)
module.exports = router