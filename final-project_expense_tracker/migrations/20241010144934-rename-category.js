'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('category', 'Category');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Category', 'category');
  }
};
