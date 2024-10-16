const express = require('express')
const router = express.Router()
const {createExpenseHandler, updateExpenseHandler, deleteExpenseHandler, getExpenseHandler, getExpensesHandler} = require('../controllers/expenseController')
const {validateToken} = require('../middlewares/auth')

router.post('/', validateToken, createExpenseHandler)
router.get('/', validateToken, getExpensesHandler)
router.get('/:id', validateToken, getExpenseHandler)
router.put('/:id', validateToken, updateExpenseHandler)
router.delete('/:id', validateToken, deleteExpenseHandler)

module.exports = router