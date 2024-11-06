'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    idString: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    nameString: {
      type: DataTypes.STRING
    },
    emailString: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true 
    },
    passwordString: {
      type: DataTypes.STRING,
      allowNull: false
    },
    levelNumber: {
      type: DataTypes.INTEGER
    },
    departmentIDString: {
      type: DataTypes.STRING,
      references: {
        model: 'Departments',
        key: 'departmentIDstring'
      }
    },
    roleString: { 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'employee'
    }
  }, {
    tableName: 'Users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.changed('passwordString')) { 
          user.passwordString = await bcrypt.hash(user.passwordString, 10);
        }
      }
    }
  });

  User.associate = function(models) {
    User.belongsTo(models.Department, { foreignKey: 'departmentIDString' });
    User.hasMany(models.BudgetRequest, { foreignKey: 'userIdString' });
    User.hasMany(models.Approval, { foreignKey: 'userIdString' });
  };

  return User;
};
