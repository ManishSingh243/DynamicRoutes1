const Sequelize = require('sequelize');

const sequelize = new Sequelize('sms', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
