'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add 'createdAt' column
    await queryInterface.addColumn('jobs', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    });

    // Add 'updatedAt' column
    await queryInterface.addColumn('jobs', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove 'createdAt' column
    await queryInterface.removeColumn('jobs', 'createdAt');

    // Remove 'updatedAt' column
    await queryInterface.removeColumn('jobs', 'updatedAt');
  }
};
