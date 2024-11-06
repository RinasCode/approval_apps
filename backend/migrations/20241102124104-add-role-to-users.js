'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'roleString', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'employee' 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'roleString');
  }
};
