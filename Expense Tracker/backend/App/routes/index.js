const express = require("express");
const router = express.Router();

router.use("/expense", (req,res,next)=>{
    console.log("in")
});

//if no route found
router.use((req, res, next) => {
    res.status(404).send("no routes found");
})

module.exports = router;