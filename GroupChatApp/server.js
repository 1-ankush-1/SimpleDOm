const bodyParser = require("body-parser");
const express = require("express");
const loginRoutes = require("./Routes/loginRoutes.js");
const homeRoutes = require("./Routes/Home.js");
//initialise
const app = express();

//middleware
app.use(bodyParser.urlencoded(
    {
        extended: true,
    }
))

//Routes
app.use(loginRoutes);
app.use(homeRoutes);
app.use((req, res, next) => {
    res.send("<h1>No Page Found</h1>")
})

//starting server
app.listen(4000, () => {
    console.log(`server is running on http://localhost:${4000} `)
})
