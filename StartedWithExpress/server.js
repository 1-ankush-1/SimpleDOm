const bodyParser = require("body-parser");
const express = require("express");
const adminRoutes = require("./Routes/admin.js");
const shopRoutes = require("./Routes/shop.js");

//initalise new exprees object
const app = express();

//body-parser do the req body parsing(handel form body not files and json)
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

//routes
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

//if no page found
app.use((req, res, next) => {
    res.status(404).send("<h1>Page Not Found</h1>")
})

//start the server
app.listen(4000, () => {
    console.log(`server is running on http://localhost:${4000} `);
})

//two routes can have same path if they have diff method
