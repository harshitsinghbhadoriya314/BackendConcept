const express = require("express");
const AuthRoute = require("./routes/Auth.routes");
const app = express();

app.use(express.json());
app.use("./api/auth", Authroute);

module.exports = app;
