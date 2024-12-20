const express = require('express')
const router = express.Router()
const {
    createExpenseHandler,
    getExpenseSummaryHandler,
    updateExpenseHandler,
    deleteExpenseHandler,
    getExpenseHandler,
    getExpensesHandler,
    downloadExpenseStatementHandler
} = require('../controllers/expenseController')
const {validateToken} = require('../middlewares/auth')

router.get('/summary', validateToken, getExpenseSummaryHandler)
router.post('/', validateToken, createExpenseHandler)
router.get('/', validateToken, getExpensesHandler)
router.get('/:id', validateToken, getExpenseHandler)
router.put('/:id', validateToken, updateExpenseHandler)
router.delete('/:id', validateToken, deleteExpenseHandler)
router.get('/statement/download', validateToken, downloadExpenseStatementHandler)

module.exports = router