const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const Router = require("./app/route/index.js")
const sequelize = require("./app/config/connect.js");

const app = express();

/**
 * Middleware
*/
app.use(cors());
app.use(bodyparser.json({ extended: false }));

/**
 * Routes
*/
app.use(Router);

sequelize.sync().then(() => {
}).catch(err => {
    console.log(`${err} occured whne syncing with sequalize`)
});

/**
 * start server
*/
app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on http://localhost:${process.env.PORT || 3000}`)
})