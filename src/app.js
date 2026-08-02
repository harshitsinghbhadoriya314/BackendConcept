const express = require("express");
const Cookie = require("cookie-parser")
const AuthRoute = require("./routes/Auth.routes");
const app = express();

app.use(express.json());
app.use(Cookie());
app.use("./api/auth", AuthRoute);

module.exports = app;
