var express = require("express");

var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Usersroutes = require("./routes/usersRoutes");
var bodyParser = require('body-parser')
app.use("/api/users", Usersroutes);
module.exports = app;