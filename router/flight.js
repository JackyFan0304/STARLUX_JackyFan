const express = require("express");
const router = express.Router();
const flightController = require("../controller/flightController");

router.post("/check", flightController.check);
router.post("/create", flightController.create);

module.exports = router;