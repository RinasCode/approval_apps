'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryIDstring: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    categoryNameString: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    budgetLimit: {
      type: DataTypes.FLOAT
    }
  }, {
    tableName: 'Categories',
    timestamps: true
  });
  
  Category.associate = function(models) {
    Category.hasMany(models.BudgetRequest, { foreignKey: 'categoryIDString' });
  };
  
  return Category;
};
