'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      idString: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nameString: {
        type: Sequelize.STRING
      },
      emailString: {
        type: Sequelize.STRING
      },
      passwordString: {
        type: Sequelize.STRING
      },
      levelNumber: {
        type: Sequelize.INTEGER
      },
      departmentIDString: {
        type: Sequelize.STRING,
        references: {
          model: 'Departments',
          key: 'departmentIDstring', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
