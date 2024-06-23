const express = require("express");
const router = express.Router();
const flightController = require("../controller/flightController");

router.post("/checkFlights", flightController.checkFlights);
router.post("/newFlights", flightController.newFlights);

module.exports = router;