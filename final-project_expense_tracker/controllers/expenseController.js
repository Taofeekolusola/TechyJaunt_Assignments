const Expense = require('../models/Expense')
const Category = require('../models/Category')
const User = require('../models/User')

// @desc create a new expense
// @route POST /expense
// @access public

const createExpenseHandler = async (req, res) => {
    try {
        const {} = req.body
    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}