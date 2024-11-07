const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User'); // Import User model if necessary

const Job = sequelize.define('job', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    jobTypes: {
        type: DataTypes.TEXT,
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
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

// Define the association here
Job.associate = (models) => {
    Job.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = Job;