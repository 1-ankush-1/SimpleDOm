const path = require("path");
const express = require("express");
const rootDir = require("../util/path.js");
const router = express.Router();

//add product route
router.get("/", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "contactus.html"))
})

//handel post request and redirect to home
router.post("/success", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "success.html"))
})

module.exports = router;