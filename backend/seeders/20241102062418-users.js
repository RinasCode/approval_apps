'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        idString: 'user1',
        nameString: 'John Doe',
        emailString: 'john@example.com',
        passwordString: hashedPassword1, 
        levelNumber: 1,
        departmentIDString: 'dept1', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idString: 'user2',
        nameString: 'Jane Doe',
        emailString: 'jane@example.com',
        passwordString: hashedPassword2, 
        levelNumber: 2,
        departmentIDString: 'dept2', 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
