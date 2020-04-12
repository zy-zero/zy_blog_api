const Sequelize = require('sequelize');
const config = require('../config');

const db = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql.options);

module.exports = db;
