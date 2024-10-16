'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('Expense', 'Expenses');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Expenses', 'Expense');
  }
};