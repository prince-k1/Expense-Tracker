const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const userTable = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'users'
});

module.exports = userTable;

