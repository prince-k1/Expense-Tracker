const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const expenseTable = sequelize.define('expenseTable', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'expenseTable'
});

module.exports = expenseTable;

