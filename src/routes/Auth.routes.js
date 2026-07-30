const express = require("express")
const router = express.Router();
const {RegisterAuth} = require("../controllers/Auth.controller.js")

router.post("/Register", RegisterAuth)
router.post("/login", LoginAuth)
module.exports = router;