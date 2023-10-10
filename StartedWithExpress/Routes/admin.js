const express = require("express");

const router = express.Router();

//add product route
router.get("/add-product", (req, res, next) => {
    res.send(`
    <html>
        <head>
            <title>Product</title>
        </head>
        <body>
            <form action="/admin/product" method="POST">
                <input type="text" name="name">
                <input type="number" name="size">
                <button type="submit">Submit</button>
            </form>
        </body>
    </html>
    `);
})

//handel post request and redirect to home
router.post("/product", (req, res, next) => {
    console.log(req.body)
    res.redirect("/shop");
})

module.exports = router;