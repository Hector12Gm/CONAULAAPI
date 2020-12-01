'use strict'
var express = require('express');
var resourceController = require('../controllers/RecursosController');
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
router.post("/newResource", uploadS, mdMemeber.authMemberAdmin, resourceController.newResource);
router.get("/getAllResources", resourceController.getAll);

module.exports = router;