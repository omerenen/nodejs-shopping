const Sequelize = require('sequelize');

const sequelize = require('../utility/database');



const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    resetToken :{
        type:Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
    }
})


module.exports = User;