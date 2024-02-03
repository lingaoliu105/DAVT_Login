const { Sequelize } = require('sequelize');
const dbCredentials = require('./db-credentials.json')
const sequelize = new Sequelize(dbCredentials.database, dbCredentials.username, dbCredentials.password, {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
