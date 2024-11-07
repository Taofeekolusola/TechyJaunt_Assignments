'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('jobs', 'userId', {
      type: Sequelize.UUID, // or the appropriate data type
      allowNull: true,      // or false, based on your requirements
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('jobs', 'userId');
  }
};
