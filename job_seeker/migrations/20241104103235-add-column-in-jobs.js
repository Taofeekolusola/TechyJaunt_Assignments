'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('jobs', 'id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('jobs', 'id');
  }
};
