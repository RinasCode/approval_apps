'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    departmentIDstring: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    departmentNameString: {
      type: DataTypes.STRING
    },
    budgetLimit: {
      type: DataTypes.FLOAT
    }
  }, {
    tableName: 'Departments',
    timestamps: true
  });
  
  Department.associate = function(models) {
    Department.hasMany(models.User, { foreignKey: 'departmentIDString' });
    Department.hasMany(models.BudgetRequest, { foreignKey: 'departmentIDString' });
  };
  
  return Department;
};
