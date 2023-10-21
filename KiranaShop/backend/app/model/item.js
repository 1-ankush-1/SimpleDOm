const Sequelize = require("sequelize");
const sequelize = require("../config/connect.js");

const Item = sequelize.define("item", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    desc: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Item;