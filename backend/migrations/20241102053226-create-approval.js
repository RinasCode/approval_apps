'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Approvals', {
      idString: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      budgetRequestIdString: {
        type: Sequelize.STRING,
        references: {
          model: 'BudgetRequests',
          key: 'idString',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      approvalDate: {
        type: Sequelize.DATE
      },
      decision: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Approvals');
  }
};
