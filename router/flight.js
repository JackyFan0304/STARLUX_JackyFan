const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, '..', 'passwords.json');
const flightController = require("../controller/flightController");

module.exports = router;