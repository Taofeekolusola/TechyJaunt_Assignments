const config = require('../config/config')
const Expense = require('../models/Expense')
const Notification = require('../models/Notification')
const { Op } = require('sequelize');

const getBudgetHandler = async (UserId) => {
    try {
        const today = new Date()

        const startDate = (today.getFullYear(), today.getMonth(), 1)
        const endDate = (today.getFullYear(), today.getMonth() + 1, 0)

        const expenses = await Expense.findAll({
            where: {
                UserId: user.id,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [{ model: Category }]
        });

        let total = 0;
        for (let expense of expenses) {
            total += Number(expense.amount)
        }

        if (total > config.expenseBudget) {
            await Notification.create({
                message: `you have exceeded your budget of ${config.expenseBudget}`,
                UserId: user.id
            })

            return true;
        } else {
            return false;
        }
    } catch (error) {
        return {message: error.message}
    }
}
 module.exports {
    getBudgetHandler
 } 