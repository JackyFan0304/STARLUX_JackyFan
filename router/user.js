const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, '..', 'passwords.json');
const userController = require("../controller/userController")
console.log(filePath);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;