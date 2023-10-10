const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("HomePage");  //send response of anykind
})

module.exports = router;