const express = require("express");

//initalise new objectd
const app = express();

//use - it allow to use middleware
app.use((req, res, next) => {
    console.log("in middleware");
    next(); //pass the request to next middleware
})

app.use("/", (req, res, next) => {
    res.send({ "one": "three" });  //send response of anykind
})

//start the server
app.listen(4000, () => {
    console.log(`server is running on http://localhost:${4000} `);
})
