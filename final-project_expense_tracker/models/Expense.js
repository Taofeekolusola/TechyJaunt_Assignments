const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Category = require ('./Category')
const User = require('./User')

const Expense = sequelize.define('Expense', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    narration: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
})


Expense.belongsTo(Category)
Expense.belongsTo(User)

module.exports = Expense