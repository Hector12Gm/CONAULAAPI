'use strict'
var express = require("express");
var router = express.Router();
var examenesController = require('../controllers/ExameneController');
var mdAuthMember = require('../middlewares/mdIdMiembro');

router.post("/newExamen", mdAuthMember.authMemberAdmin, examenesController.new);
router.post("/newPregunta", mdAuthMember.authMemberAdmin, examenesController.newPregunta);
router.get("/getPreguntas/:id_examen", examenesController.getPreguntas);
router.get("/getExamenes", examenesController.getExamenes);
router.post("/newCali", examenesController.test);
router.get("/getCalificaciones/:id_examen", examenesController.getCali);
router.get("/getResumenCali/:id_examen", examenesController.getCaliRes);
router.get("/validarExamen/:id_examen", examenesController.validate);

module.exports = router;