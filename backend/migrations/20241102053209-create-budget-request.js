'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BudgetRequests', {
      idString: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userIdString: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'idString',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      requestDate: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.FLOAT
      },
      reason: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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
      expectedDate: {
        type: Sequelize.DATE
      },
      attachmentURL: {
        type: Sequelize.STRING
      },
      totalAmount: {
        type: Sequelize.FLOAT
      },
      categoryIDString: {
        type: Sequelize.STRING,
        references: {
          model: 'Categories',
          key: 'categoryIDstring',
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
    await queryInterface.dropTable('BudgetRequests');
  }
};
