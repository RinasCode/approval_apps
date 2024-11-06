'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Departments', [
      {
        departmentIDstring: 'dept1',  
        departmentNameString: 'Finance',  
        budgetLimit: 5000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departmentIDstring: 'dept2', 
        departmentNameString: 'HR',  
        budgetLimit: 3000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departmentIDstring: 'dept3',  
        departmentNameString: 'Marketing',  
        budgetLimit: 4000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};
