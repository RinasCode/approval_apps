'use strict';
module.exports = (sequelize, DataTypes) => {
  const Approval = sequelize.define('Approval', {
    idString: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    budgetRequestIdString: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userIdString: {
      type: DataTypes.STRING,
      allowNull: false
    },
    approvalDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    decision: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'Approvals',
    timestamps: true
  });
  
  Approval.associate = function(models) {
    Approval.belongsTo(models.BudgetRequest, { foreignKey: 'budgetRequestIdString' });
    Approval.belongsTo(models.User, { foreignKey: 'userIdString' });
  };
  
  return Approval;
};
