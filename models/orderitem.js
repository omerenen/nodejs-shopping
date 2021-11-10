const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const orderItem = sequelize.define('orderitem', {
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER,
    price: Sequelize.DOUBLE
})

module.exports = orderItem;