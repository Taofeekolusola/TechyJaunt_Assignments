'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Notifications', 'userId', 'UserId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Notifications', 'UserId', 'userId');
  }
};
