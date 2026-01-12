const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employee = require('./employee');

const Experience = sequelize.define('Experience', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  certificate: DataTypes.STRING
});

Experience.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = Experience;
