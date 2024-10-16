const Expense = require('../models/Expense')
const Category = require('../models/Category')
const User = require('../models/User')

// @desc create a new expense
// @route POST /expense
// @access public

const createExpenseHandler = async (req, res) => {
    try {
        const user = req.user
        const { amount, narration, categoryId } = req.body;

        // Check if amount is a number
        if (typeof amount!== 'number') {
            return res.status(400).json({ 
                message: 'Invalid datatype, amount must be a number'
            });
        }
        // Check if narration is a string
        if (typeof narration!=='string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, narration must be a string'
            });
        }
        // Check if categoryId is a string
        if (typeof categoryId!=='string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, categoryId must be a string'
            });
        }

        // Fetch the category
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            });
        }

        // Create a new expense and associate it with the user
        const expense = await Expense.create({
            amount,
            narration,
        });

        // Associate the expense with the user and category
        expense.setUser(user);
        expense.setCategory(category);

        res.status(201).json(expense);

    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}

// @desc get all expenses for a user
// @GET /expenses
// @access private

const getExpensesHandler = async (req, res) => {
    try {
        const user = req.user
        const expenses = await Expense.findAll({
            where: {
                UserId: user.id
            },
            include: [{ model: Category }]
        });

        res.json(expenses);
    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}

// @desc get a single expense
// @route GET /expense/:id
// @access private

const getExpenseHandler = async (req, res) => {
    try {
        const { id } = req.params;

        if (typeof id !== 'string') {
            return res.status(404).json('id must be a string')
        }
        const expense = await Expense.findByPk(id)

        if (!expense) {
            return res.status(404).json({
                message: 'Expense not found'
            });
        }

        res.json(expense);
    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}

// @desc update expense
// @route GET /expense/:id
// @access private

const updateExpenseHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, narration, categoryId } = req.body;

        if (typeof id!=='string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, id must be a string'
            });
        }

        if (typeof amount!== 'number') {
            return res.status(400).json({ 
                message: 'Invalid datatype, amount must be a number'
            });
        }
        if (typeof narration!=='string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, narration must be a string'
            });
        }
        if (typeof categoryId!=='string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, categoryId must be a string'
            });
        }
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({
                message: 'Expense not found'
            });
        }
        
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            });
        }

        expense.amount = amount;
        expense.narration = narration;
        await expense.save();

        expense.setCategory(category);

        res.status(200).json(expense);

    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}

// @desc delete expense
// @route DELETE /expense/:id
// @access private

const deleteExpenseHandler = async (req, res) => {
    try {
        const { id } = req.params;

        if (typeof id!=='string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, id must be a string'
            });
        }

        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({
                message: 'Expense not found'
            });
        }

        await expense.destroy();

        res.status(204).json({
            message: 'Expense deleted successfully'
        });

    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}
module.exports = {
    createExpenseHandler,
    getExpensesHandler,
    getExpenseHandler,
    updateExpenseHandler,
    deleteExpenseHandler,
}