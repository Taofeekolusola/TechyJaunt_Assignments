'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 50]
        }
      },
      jobType: {
        type: Sequelize.ENUM('full-time', 'part-time','remote'),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      salary: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jobs');
  }
};
