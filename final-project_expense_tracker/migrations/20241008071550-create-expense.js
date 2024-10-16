'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('expense', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    narration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.UUID,
        references: {
            model: 'users',
            key: 'id'
        },
        
    },
    CategoryId: {
        type: Sequelize.UUID,
        references: {
            model: 'category',
            key: 'id'
        },
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('expense');
  }
};