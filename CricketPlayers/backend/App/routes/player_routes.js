const express = require("express");
const router = express.Router();
const playerController = require("../controller/player_controller.js");

router.get("/", playerController.getAllPlayer);
router.post("/", playerController.getPlayerByName);
router.post("/add", playerController.addPlayer);
router.delete("/delete/:id", playerController.deletePlayer);
router.put("/edit/:id", playerController.editPlayer);

module.exports = router;