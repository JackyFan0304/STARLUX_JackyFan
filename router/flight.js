const express = require("express");
const router = express.Router();
const flightController = require("../controller/flightController");

router.post("/checkflights", flightController.checkflights);

module.exports = router;