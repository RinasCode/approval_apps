'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        idString: 'user7',
        nameString: 'Alice Johnson',
        emailString: 'alice.johnson@dept3.com',
        passwordString: await bcrypt.hash('password123', 10),
        levelNumber: 1,
        departmentIDString: 'dept3',
        roleString: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idString: 'user8',
        nameString: 'Bob Smith',
        emailString: 'bob.smith@dept3.com',
        passwordString: await bcrypt.hash('password123', 10),
        levelNumber: 1,
        departmentIDString: 'dept3',
        roleString: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idString: 'user9',
        nameString: 'Charlie Brown',
        emailString: 'charlie.brown@dept3.com',
        passwordString: await bcrypt.hash('password123', 10),
        levelNumber: 2,
        departmentIDString: 'dept3',
        roleString: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idString: 'user10',
        nameString: 'David Wilson',
        emailString: 'david.wilson@dept1.com',
        passwordString: await bcrypt.hash('password123', 10), 
        levelNumber: 3,
        departmentIDString: 'dept1',
        roleString: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idString: 'user11',
        nameString: 'Eva Adams',
        emailString: 'eva.adams@dept2.com',
        passwordString: await bcrypt.hash('password123', 10), 
        levelNumber: 4,
        departmentIDString: 'dept2',
        roleString: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idString: 'user12',
        nameString: 'Franklin Pierce',
        emailString: 'franklin.pierce@dept2.com',
        passwordString: await bcrypt.hash('password123', 10), 
        levelNumber: 5,
        departmentIDString: 'dept2',
        roleString: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      emailString: {
        [Sequelize.Op.in]: [
          'alice.johnson@dept3.com', 
          'bob.smith@dept3.com', 
          'charlie.brown@dept3.com', 
          'david.wilson@dept1.com', 
          'eva.adams@dept2.com', 
          'franklin.pierce@dept2.com'
        ]
      }
    });
  }
};
