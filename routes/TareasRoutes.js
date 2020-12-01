'use strict'
var express = require('express');
var tareaController = require('../controllers/TareasController');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var authTipo = require('../middlewares/mdValidaTipos');
var mdMemeber = require('../middlewares/mdIdMiembro');
//Configuracion del almacenamiento
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var uploadS = multer({ storage: storage }).single("file");



//Rutas
router.post("/newTarea", uploadS, authTipo.validaTipo,
    mdMemeber.authMemberAdmin, tareaController.newTarea);
router.get("/getAllTareas", tareaController.getTareas);
router.post("/entregarTarea", uploadS, authTipo.validaTipo, tareaController.newEntrega);
router.get("/getEntregas/:id_tarea", mdMemeber.authMemberAdmin, tareaController.getEntregas);
router.get("/validarEntrega/:id_tarea", tareaController.validateEntrega);
module.exports = router;