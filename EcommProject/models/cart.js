const Sequelize = require("sequelize");
const sequalize = require('../util/database.js')

const Cart = sequalize.define("cart", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;