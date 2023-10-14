const mysql = require("mysql2");
const DBconfig = require("./dbConfig");

//create poll of connection instead of connecting and disconnecting again and again
const pool = mysql.createPool(DBconfig)

module.exports = pool.promise();