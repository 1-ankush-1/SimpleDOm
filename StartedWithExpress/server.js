const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const adminRoutes = require("./Routes/admin.js");
const shopRoutes = require("./Routes/shop.js");
const contactRoutes = require("./Routes/contactus.js");

//initalise new exprees object
const app = express();

//body-parser do the req body parsing(handel form body not files and json)
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

//provide read access to a file
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/contactus", contactRoutes);

//if no page found
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})

//start the server
app.listen(4000, () => {
    console.log(`server is running on http://localhost:${4000} `);
})

//two routes can have same path if they have diff method
