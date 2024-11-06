'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      idString: 'admin1',
      nameString: 'Admin User',
      emailString: 'admin@mail.com',
      passwordString: bcrypt.hashSync('pass12345', 10),
      levelNumber: null, 
      departmentIDString: null, 
      roleString: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { emailString: 'admin@example.com' }, {});
  }
};
