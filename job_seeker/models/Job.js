const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Job = sequelize.define('job', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    jobType: {
        type: DataTypes.ENUM('full-time', 'part-time', 'remote'),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    salary: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Job