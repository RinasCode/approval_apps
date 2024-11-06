'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Approvals', [
      {
        idString: 'app1',
        budgetRequestIdString: 'req1', 
        userIdString: 'user2', 
        approvalDate: new Date(),
        decision: 'Approved', 
        comments: 'Pengajuan anggaran disetujui setelah evaluasi.', 
        createdAt: new Date(), 
        updatedAt: new Date()  
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Approvals', null, {});
  }
};