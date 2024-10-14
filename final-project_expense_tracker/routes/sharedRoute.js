const express = require('express')
const router = express.Router()
const {sharedControllerHandler} = require('../controllers/sharedController')

router.get('/', sharedControllerHandler)
module.exports = router