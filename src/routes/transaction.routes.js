const mongoose = require('mongoose');
const router = require('express').Router();
const authmiddleware = require('../middleware/auth.middleware');


router.post("/", authmiddleware.authmiddleware, CreateTransaction);

module.exports = router;