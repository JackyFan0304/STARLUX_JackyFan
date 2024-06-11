const express = require("express");
const router = express.Router();
const fs = require("fs");
const customer = require("./customer");
const flight = require("./flight");
const ticket = require("./ticket");

router.get("/", (req,res) => //設定根路由
{
    res.send("here is router index");
})

router.use("/customer", customer);
router.use("/flight", flight);
router.use("/ticket", ticket);

module.exports = router;
