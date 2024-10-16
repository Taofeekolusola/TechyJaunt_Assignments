const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const User = require('./User')

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    mesage: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
})

Notification.belongsTo(User)

module.exports = Notification