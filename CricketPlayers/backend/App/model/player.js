const Sequelize = require("sequelize");
const sequelize = require("../config/connect.js");

const Player = sequelize.define("player", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    avg: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    birthplace: {
        type: Sequelize.STRING,
        allowNull: false
    },
    century: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dob: {
        type: Sequelize.STRING,
        allowNull: false
    }, fifties: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    noofmatches: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    wickets: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    career: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Player;
