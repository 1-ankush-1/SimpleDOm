

const express = require("express");
const router = express.Router();
const playerRoutes = require("./player_routes");

router.use("/player", playerRoutes);

//if no route found
router.use((req, res, next) => {
    res.status(404).send("no routes found");
})

module.exports = router;