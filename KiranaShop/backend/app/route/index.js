const express = require("express");
const router = express.Router();
const itemRoutes = require("./item-route.js");

router.use("/shopitems", itemRoutes)

//if no route found
router.use((req, res, next) => {
    res.status(404).send("no routes found");
})

module.exports = router;