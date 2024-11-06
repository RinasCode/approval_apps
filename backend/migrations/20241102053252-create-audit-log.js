'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuditLogs', {
      logIDstring: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      tableNameString: {
        type: Sequelize.STRING
      },
      actionTypeString: {
        type: Sequelize.STRING
      },
      oldValueString: {
        type: Sequelize.STRING
      },
      newValueString: {
        type: Sequelize.STRING
      },
      changedByString: {
        type: Sequelize.STRING
      },
      changeDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('AuditLogs');
  }
};
