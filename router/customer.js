const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, '..', 'passwords.json');
const customerController = require("../controller/customerController")
console.log(filePath);
router.post("/register", customerController.register);
router.post("/login", customerController.login);

module.exports = router;