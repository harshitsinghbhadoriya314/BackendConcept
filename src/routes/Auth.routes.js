const express = require("express")
const router = express.Router();
const {RegisterAuth, LoginAuth} = require("../controller/Auth.controller.js")

router.post("/Register", RegisterAuth)
router.post("/login", LoginAuth)
module.exports = router;