const express = require("express");
const router = express.Router();
const expenseRoutes = require("./expense_route.js");

router.use("/expense", expenseRoutes);

//if no route found
router.use((req, res, next) => {
    res.status(404).send("no routes found");
})

module.exports = router;