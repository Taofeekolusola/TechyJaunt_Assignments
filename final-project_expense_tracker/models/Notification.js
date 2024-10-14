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
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'User',
            key: 'id'
        },
    }
}, {
    timestamps: true
})

module.exports = Notification