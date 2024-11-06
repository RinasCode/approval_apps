'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        categoryIDstring: 'cat1', 
        categoryNameString: 'Operational',  
        description: 'Operational expenses',
        budgetLimit: 1000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryIDstring: 'cat2',  
        categoryNameString: 'Marketing',  
        description: 'Marketing expenses',
        budgetLimit: 2000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
