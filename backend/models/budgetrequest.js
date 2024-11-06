'use strict';
module.exports = (sequelize, DataTypes) => {
  const BudgetRequest = sequelize.define('BudgetRequest', {
    idString: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    userIdString: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requestDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    departmentIDString: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expectedDate: {
      type: DataTypes.DATE
    },
    attachmentURL: {
      type: DataTypes.STRING
    },
    totalAmount: {
      type: DataTypes.FLOAT
    },
    categoryIDString: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'BudgetRequests',
    timestamps: true
  });
  
  BudgetRequest.associate = function(models) {
    BudgetRequest.belongsTo(models.User, { foreignKey: 'userIdString' });
    BudgetRequest.belongsTo(models.Department, { foreignKey: 'departmentIDString' });
    BudgetRequest.belongsTo(models.Category, { foreignKey: 'categoryIDString' });
    BudgetRequest.hasOne(models.Approval, { foreignKey: 'budgetRequestIdString' });
  };
  
  return BudgetRequest;
};
