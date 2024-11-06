'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    logIDstring: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    tableNameString: {
      type: DataTypes.STRING
    },
    actionTypeString: {
      type: DataTypes.STRING
    },
    oldValueString: {
      type: DataTypes.STRING
    },
    newValueString: {
      type: DataTypes.STRING
    },
    changedByString: {
      type: DataTypes.STRING
    },
    changeDate: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'AuditLogs',
    timestamps: true
  });
  
  return AuditLog;
};
