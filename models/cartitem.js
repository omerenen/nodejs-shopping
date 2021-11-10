const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const cartItem = sequelize.define('cartitem', {
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
})

module.exports = cartItem;