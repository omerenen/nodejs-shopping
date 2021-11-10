const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Cart = sequelize.define('Cart', {
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})


module.exports = Cart