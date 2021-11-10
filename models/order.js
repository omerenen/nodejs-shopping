const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const order = sequelize.define('order', {
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
})

module.exports = order;