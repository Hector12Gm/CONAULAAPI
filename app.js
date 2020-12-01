var express = require("express");
var cors = require('cors');
var app = express();
var mdAuth = require('./middlewares/mdAuth');
var memberAth = require('./middlewares/mdIdMiembro');
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//Referencias a rutas
var Usersroutes = require("./routes/usersRoutes");
var groupsRoutes = require('./routes/groupRoutes');
var membersRoutes = require('./routes/membersRoutes');
var publishRoutes = require('./routes/publishRoutes');
var resourcesRoutes = require('./routes/RecursosRoutes');
var tareasRoutes = require('./routes/TareasRoutes');
var examenesRoutes = require('./routes/ExamensRoutes');
var path = require('path');
app.use(express.static(path.join(__dirname, 'uploads')));


//Usuarios
app.use("/api/users", Usersroutes);
//Grupos
app.use("/api/groups", mdAuth.ensureAuth);
app.use("/api/groups", groupsRoutes);
//Miembros grupo
app.use("/api/members", mdAuth.ensureAuth);
app.use("/api/members", membersRoutes);

//Publicaciones
app.use("/api/publish", mdAuth.ensureAuth);
app.use("/api/publish", memberAth.authMember);
app.use("/api/publish", publishRoutes);

//Recursos
app.use("/api/resources", mdAuth.ensureAuth);
app.use("/api/resources", memberAth.authMember);

app.use("/api/resources", resourcesRoutes);

//Tareas
app.use("/api/tareas", mdAuth.ensureAuth);
app.use("/api/tareas", memberAth.authMember);
app.use("/api/tareas", tareasRoutes);

//Examenes
app.use('/api/examenes', mdAuth.ensureAuth);
app.use('/api/examenes', memberAth.authMember);
app.use('/api/examenes', examenesRoutes);

module.exports = app;