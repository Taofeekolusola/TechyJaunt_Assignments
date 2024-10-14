'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('notification', 'Notification');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Notification', 'notification')
  }
};
