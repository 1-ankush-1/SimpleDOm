const Sequelize = require("sequelize");
const sequelize = require("../config/connect.js");

const Expense = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    catogary: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    amt: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})


module.exports = Expense;