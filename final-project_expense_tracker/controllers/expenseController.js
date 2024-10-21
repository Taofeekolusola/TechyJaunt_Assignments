const Expense = require('../models/Expense')
const Category = require('../models/Category')
const User = require('../models/User')
const { Op } = require('sequelize');

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
        let {filter, startDate, endDate, search, searchNarration} = req.query;

        if (searchNarration) {
            if (typeof searchNarration !== 'string') {
                res.status(404).json('invalid datatype narration must be a string')
                return;
            }
            const expenses = await Expense.findAll({
                where: {
                    UserId: user.id,
                    narration: {
                        [Op.like]: `%${searchNarration}%`
                    }
                },
                include: [{ model: Category }]
            })
            return res.status(200).json({expenses})
        }

        if (search) {
            // Convert search to a number (as it is stored in the database as a decimal or float)
            const searchAmount = Number(search);
        
            if (isNaN(searchAmount)) {
                return res.status(400).json({
                    message: 'Invalid datatype, search must be a number'
                });
            }
        
            // Query expenses containing the search term (amount)
            const expenses = await Expense.findAll({
                where: {
                    UserId: user.id,
                    amount: searchAmount // Search for the amount in the Expense model
                },
                include: [{ model: Category }]  // Include related categories
            });
        
            if (expenses.length === 0) {
                return res.status(404).json({
                    message: 'No expenses found for the given amount'
                });
            }
        
            return res.status(200).json(expenses);
        }

        // Filter expenses based on startDate and endDate
        if (startDate && endDate) {

            // Convert date query parameters to Date objects
            if (startDate) {
                startDate = new Date(startDate);
            }
            if (endDate) {
                endDate = new Date(endDate);
                // add one day to the endDate
                endDate = new Date(endDate.setDate(endDate.getDate() + 1));
            }
    
            // Check if startDate and endDate are valid Date objects
            if (!(startDate instanceof Date && endDate instanceof Date)) {
                return res.status(400).json({
                    message: 'Invalid date format, use YYYY-MM-DD'
                });
            }
            const expenses = await Expense.findAll({
                where: {
                    UserId: user.id,
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                        // [Op.gte]: startDate,
                        // [Op.lte]: endDate
                    }
                },
                include: [{ model: Category }]
            });
            return res.status(200).json(expenses);
        }

        if (filter) {
            if (typeof filter !== 'string') {
                return res.status(400).json({
                    message: 'Invalid datatype, filter must be a string'
                });
            }

            const category = await Category.findOne({ where: 
                {
                    name: filter
                }
            });
            
            if (!category) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }
            const expenses = await Expense.findAll({
                where: {
                    UserId: user.id,
                    CategoryId: category.id
                },
                include: [{ model: Category }]
            })
            return res.status(200).json(expenses);
        } else {
            const expenses = await Expense.findAll({
                where: {
                    UserId: user.id
                },
                include: [{ model: Category }]
            });
            return res.status(200).json(expenses);
        }

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

// @desc get expense summary
// @route GET /summary
// @access private
const getExpenseSummaryHandler = async (req, res) => {
    try {
        let {startDate, endDate} = req.query
        const user = req.user
        let expenses;
        if (startDate && endDate) {

            // Convert date query parameters to Date objects
            if (startDate) {
                startDate = new Date(startDate);
            }
            if (endDate) {
                endDate = new Date(endDate);

                // add one day to the endDate
                endDate = new Date(endDate.setDate(endDate.getDate() + 1));
            }
    
            // Check if startDate and endDate are valid Date objects
            if (!(startDate instanceof Date && endDate instanceof Date)) {
                return res.status(400).json({
                    message: 'Invalid date format, use YYYY-MM-DD'
                });
            }
            expenses = await Expense.findAll({
                where: {
                    UserId: user.id,
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                include: [{ model: Category }]
            });

        } else {
            expenses = await Expense.findAll({
                where: {
                    UserId: user.id
                },
                include: [{ model: Category }]
            })
        }

        // Sort expenses by date in descending order
        // if (!expenses.length <= 0) {
        //     expenses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        // }
        let total = 0;
        let average = 0;
        expenses.forEach(expense => {
            total += Number(expense.amount);
        })
        if (!expenses.length <= 0) {
            average = total / expenses.length;
        }

        return res.status(200).json({ total, average });

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
    getExpenseSummaryHandler
}