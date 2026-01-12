const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Department = require('./department');
const Designation = require('./designation');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  salary: DataTypes.FLOAT,
  qualification: DataTypes.STRING,
  image: DataTypes.STRING
});

Employee.belongsTo(Department, { foreignKey: 'departmentId' });
Employee.belongsTo(Designation, { foreignKey: 'designationId' });

module.exports = Employee;
