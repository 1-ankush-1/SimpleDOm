const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require("path");
const Router = require("./App/routes/index.js");
const sequelize = require("./App/config/connect.js");

const app = express();

/**
 * Middleware
*/
app.use(cors());
app.use(bodyparser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
*/
app.use(Router);

sequelize.sync().then(result => {
    // console.log(result)
}).catch(err => {
    console.log(`${err} occured whne syncing with sequalize`)
});

/**
 * start server
*/
app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on http://localhost:${process.env.PORT || 3000}`)
})