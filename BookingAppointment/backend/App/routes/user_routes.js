const express = require("express");
const router = express.Router();
const UserController = require("../controller/user_controller.js");

router.get("/", UserController.getAllUser);
router.delete("/delete/:userid", UserController.deleteUser);
router.get("/update/:userid", UserController.updateUser);

module.exports = router;