const express = require("express");
const router = express.Router();
const user = require("./user");
const flight = require("./flight");
const booking = require('./booking');

router.get("/", (req,res) => //設定根路由
{
    res.send("here is router index");
})

router.use("/user", user);
router.use("/flight", flight);
router.use('/bookings', booking);

module.exports = router;
