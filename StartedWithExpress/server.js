const bodyParser = require("body-parser");
const express = require("express");

//initalise new exprees object
const app = express();

//body-parser do the req body parsing(handel form body not files and json)
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

//add product route
app.use("/add-product", (req, res, next) => {
    res.send(`
    <html>
        <head>
            <title>Product</title>
        </head>
        <body>
            <form action="/product" method="POST">
                <input type="text" name="name">
                <input type="number" name="size">
                <button type="submit">Submit</button>
            </form>
        </body>
    </html>
    `);
})

//handel post request and redirect to home
app.post("/product", (req, res, next) => {
    console.log(req.body)
    res.redirect("/");
})

//root route
app.use("/", (req, res, next) => {
    res.send("HomePage");  //send response of anykind
})

//start the server
app.listen(4000, () => {
    console.log(`server is running on http://localhost:${4000} `);
})
