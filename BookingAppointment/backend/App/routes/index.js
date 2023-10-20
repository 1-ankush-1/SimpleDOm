const express = require("express");
const authRoutes = require("./auth_routes.js")
const userRoutes = require("./user_routes.js");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

//if no route found
router.use((req, res, next) => {
    res.status(404).send("no routes found");
})

module.exports = router;


