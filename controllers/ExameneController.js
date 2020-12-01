'use strict'
var generar = require('../middlewares/mdGIds');
var modelExamenes = require('../models/ExamenesModel');


let examenesController = () => {};

examenesController.new = (req, res) => {
    if (req.body.titulo && req.body.fecha) {
        let examen = {
            id_examen: generar.generar(49),
            titulo: req.body.titulo,
            id_grupo: req.headers.id_grupo,
            fecha: req.body.fecha
        };

        modelExamenes.new([examen.id_examen, examen.id_grupo,
            examen.titulo, examen.fecha
        ], (err, rows) => {
            if (err) return res.status(500).send({ message: "No se envio el examen" });
            if (rows.affectedRows > 0) {
                res.status(200).send({ examen: examen });
            } else {
                res.status(500).send({ message: "No se creo el examen" });
            }
        });
    } else {
        return res.status(400).send({ message: "Peticion incorrecta" });
    }
};
/*
CREATE TABLE PreguntasExamen(
    id_pregunta char(50) primary key,
    enunciado char(100),
    respuestaC char(100),
    respuestaI1 char(100),
    respuestaI2 char(100),
    id_examen char(50),FOREIGN KEY (id_examen) REFERENCES Examenes(id_examen)
    );

 */
examenesController.getPreguntas = (req, res) => {
    let id_examen = req.params.id_examen;
    modelExamenes.getPreguntas([id_examen], (err, rows) => {
        if (err) return res.status(500).send({ message: "Error al seleccionar" });
        return res.status(200).send({ preguntas: rows });
    });
};
examenesController.getExamenes = (req, res) => {
    let id_grupo = req.headers.id_grupo;
    modelExamenes.getExamenes([id_grupo], (err, rows) => {
        if (err) return res.status(500).send({ message: "Error al seleccionar" });
        return res.status(200).send({ examenes: rows });
    });
};
examenesController.newPregunta = (req, res) => {

    if (!(req.body.enunciado && req.body.respuestaC &&
            req.body.respuestaI1 && req.body.respuestaI2 &&
            req.body.id_examen)) return res.status(400).send({ message: "Peticion incorrecta" });
    let pregunta = {
        id_pregunta: generar.generar(49),
        enunciado: req.body.enunciado,
        respuestaC: req.body.respuestaC,
        respuestaI1: req.body.respuestaI1,
        respuestaI2: req.body.respuestaI2,
        id_examen: req.body.id_examen

    }
    modelExamenes.newPregunta([pregunta.id_pregunta, pregunta.enunciado,
        pregunta.respuestaC, pregunta.respuestaI1, pregunta.respuestaI2,
        pregunta.id_examen
    ], (err, rows) => {
        if (err) return res.status(500).send({ message: err });
        if (rows.affectedRows > 0) {
            return res.status(200).send({ pregunta: pregunta });
        } else {
            return res.status(500).send({ message: "Error al crear la pregunta!" });
        }
    });
};
examenesController.validate = (req, res) => {
    let id_examen = req.params.id_examen;
    modelExamenes.validate([req.miembro.id_miembro, id_examen], (err, rows) => {
        if (err) {
            return res.status(500).send({ message: "Error" });
        } else {
            return res.status(200).send({ calificaciones: rows });
        }
    });

};
/* 
Create table CalificacionesExamen(
  id_calificacion char(50) PRIMARY KEY,
  calificacion int ,
  id_examen char(50),
  FOREIGN KEY (id_examen) REFERENCES Examenes(id_examen),
  id_miembro char(50),
  FOREIGN KEY (id_miembro) REFERENCES miembrosgrupo(id_miembro));

 */
examenesController.test = (req, res) => {
    if (!(req.body.id_examen && req.body.calificacion)) return res.status(400).send({ message: "Error peticion incorrecta" });
    let calificacion = {
        id_calificacion: generar.generar(49),
        calificacion: req.body.calificacion,
        id_examen: req.body.id_examen,
        id_miembro: req.miembro.id_miembro
    }
    modelExamenes.test([calificacion.id_calificacion,
        calificacion.calificacion,
        calificacion.id_examen, calificacion.id_miembro
    ], (err, rows) => {
        if (err) return res.status(500).send({ message: "Error al insertar el examen" });
        if (rows.affectedRows > 0) {
            return res.status(200).send({ calificacion: calificacion });
        } else {
            return res.status(500).send({ message: "Error al insertar" });
        }
    });

};
examenesController.getCali = (req, res) => {
    let id_examen = req.params.id_examen;
    modelExamenes.getCali([id_examen], (err, rows) => {
        if (err) return res.status(500).send({ message: err });
        return res.status(200).send({ calificaciones: rows[0] });
    });
};

examenesController.getCaliRes = (req, res) => {
    let id_examen = req.params.id_examen;
    modelExamenes.getCaliRes([id_examen], (err, rows) => {
        if (err) return res.status(500).send({ message: "Error al resumir" });
        return res.status(200).send({ calificaciones: rows[0] });
    });
};

module.exports = examenesController;