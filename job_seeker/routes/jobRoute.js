const express = require('express')
const router = express.Router()
const { searchJobs } = require('../controllers/jobController')

router.get('/', searchJobs)

module.exports = router