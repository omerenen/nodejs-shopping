const Sequelize = require('sequelize');
const dbConfig = require('./config');

const sequelize = new Sequelize(dbConfig.scheme, dbConfig.user, dbConfig.password, {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    logging: false
});

module.exports = sequelize;