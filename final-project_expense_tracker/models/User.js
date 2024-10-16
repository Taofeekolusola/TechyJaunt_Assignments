const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
       type: DataTypes.DATE,
       allowNull: false
    },
    updatedAt: {
       type: DataTypes.DATE,
       allowNull: false
    }
}, {
    timestamps: true
})

// Associations
User.associate = (models) => {
    User.hasMany(models.Expense
    )
    User.associate = (models) => {
        User.hasMany(models.Notification
        )
}

module.exports = User