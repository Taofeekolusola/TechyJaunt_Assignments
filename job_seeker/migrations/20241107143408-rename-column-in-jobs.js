'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('jobs', 'jobType', 'jobTypes');
    await queryInterface.changeColumn('jobs', 'jobTypes', {
      type: Sequelize.TEXT,  // New data type
      allowNull: true,  // Adjust the constraints if needed
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('jobs', 'jobTypes', 'jobType');
    await queryInterface.changeColumn('jobs', 'jobType', {
      type: Sequelize.TEXT,  // New data type
      allowNull: true,  // Adjust the constraints if needed
    });
  }
};