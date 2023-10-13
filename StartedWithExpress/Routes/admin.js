const path = require("path");
const express = require("express");
const rootDir = require("../util/path.js");
const router = express.Router();

//add product route
router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"))
})

//handel post request and redirect to home
router.post("/add-product", (req, res, next) => {
    console.log(req.body)
    res.redirect("/shop");
})

module.exports = router;