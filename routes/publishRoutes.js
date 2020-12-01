'use strict'
var express = require('express');
var publishController = require('../controllers/publishController');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var authTipo = require('../middlewares/mdValidaTipos');

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
router.post("/newPublish", uploadS, authTipo.validaTipo, publishController.newPublish);
router.get("/getAllGroup/:id_grupo", publishController.getAllGroup);

module.exports = router;