const express = require("express");
const router = express.Router();
const itemController = require("../controller/item-controller.js");

router.get("/", itemController.getAllItems)
router.post("/add", itemController.addItem)
router.put("/buy/:id", itemController.EditItemQuantity);

module.exports = router;