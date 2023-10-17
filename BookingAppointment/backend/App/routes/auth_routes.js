const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth_controller.js");

router.post("/register", AuthController.registerUser);

module.exports = router;