const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Department = require('./department');

const Designation = sequelize.define('Designation', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING }
});

Designation.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = Designation;
