'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Expenses', 'userId', 'UserId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Expenses', 'UserId', 'userId');
  }
};