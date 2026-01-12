const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ems_db', 'postgres', 'new_password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
