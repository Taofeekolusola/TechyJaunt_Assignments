'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'password',
      validate: {
        notEmpty: true,
        len: [8, 255],
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'password');
  }
};
