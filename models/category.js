const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const controllerCategories = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    description: {
        type: Sequelize.STRING,
        allowNull: true,

    }
})

module.exports = controllerCategories;