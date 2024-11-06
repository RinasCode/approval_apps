'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('BudgetRequests', [
      {
        idString: 'req1',
        userIdString: 'user1', 
        requestDate: new Date(),
        amount: 5000,
        reason: 'Project A funding',
        status: 'Pending',
        departmentIDString: 'dept1', 
        expectedDate: new Date(),
        attachmentURL: 'http://example.com/attachment1',
        totalAmount: 5000,
        categoryIDString: 'cat1', 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BudgetRequests', null, {});
  }
};