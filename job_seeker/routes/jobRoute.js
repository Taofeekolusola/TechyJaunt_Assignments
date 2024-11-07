const express = require('express')
const router = express.Router()
const { searchJobs, deleteJobs, createJobs } = require('../controllers/jobController')
const {validateToken} = require('../middleware/authentication')

router.get('/', validateToken, searchJobs);
router.post('/', createJobs);
router.delete('/:id', validateToken, deleteJobs);

module.exports = router