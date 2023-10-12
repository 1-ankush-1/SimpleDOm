const express = require("express");
const contactController = require("../controllers/contactController.js");
const router = express.Router();

//add product route
router.get("/", contactController.getContactus)

//handel post request and redirect to home
router.post("/success", contactController.Success)

module.exports = router;