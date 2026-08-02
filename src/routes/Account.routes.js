const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/Authmiddleware');
const CreateAccounts = require('../controller/Account.controller');

router.post("/", AuthMiddleware, CreateAccounts.CreateAccounts())

module.exports = router;