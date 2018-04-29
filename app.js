var express = require("express");

var app = express();
var mdAuth = require('./middlewares/mdAuth');
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Referencias a rutas
var Usersroutes = require("./routes/usersRoutes");
var groupsRoutes = require('./routes/groupRoutes');
var membersRoutes = require('./routes/membersRoutes');

//Usuarios
app.use("/api/users", Usersroutes);
//Grupos
app.use("/api/groups", mdAuth.ensureAuth);
app.use("/api/groups", groupsRoutes);
//Miembros grupo
app.use("/api/members", mdAuth.ensureAuth);
app.use("/api/members", membersRoutes);

module.exports = app;