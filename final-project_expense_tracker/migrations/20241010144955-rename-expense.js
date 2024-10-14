'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('expense', 'Expense');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Expense', 'expense')
  }
};
