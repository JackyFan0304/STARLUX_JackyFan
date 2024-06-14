const express = require("express");
const router = express.Router();
const fs = require("fs");
const user = require("./user");
const flight = require("./flight");
const ticket = require("./ticket");

router.get("/", (req,res) => //設定根路由
{
    res.send("here is router index");
})

router.use("/user", user);
router.use("/flight", flight);
router.use("/ticket", ticket);

module.exports = router;
