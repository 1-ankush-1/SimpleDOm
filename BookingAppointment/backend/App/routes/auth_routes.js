const express = require("express");
const router = express.Router();

router.get("/register", (req, res, next) => {
    res.status(200).send("you are in register");
})

module.exports = router;