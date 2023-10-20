const express = require("express");
const router = express.Router();
const tableRoutes = require("./tables_routes.js");

router.use("/tables", tableRoutes);

//if no route found
router.use((req, res, next) => {
    res.status(404).send("no routes found");
})

module.exports = router;