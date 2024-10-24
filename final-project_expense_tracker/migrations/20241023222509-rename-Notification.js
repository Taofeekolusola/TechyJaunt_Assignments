'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('Notification', 'Notifications');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Notifications', 'Notification');
  }
};
