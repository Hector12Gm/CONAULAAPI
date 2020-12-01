'use strict'
var modelTareas = require('../models/TareasModel');
var generar = require('../middlewares/mdGIds');
var moment = require('moment');
let tareasController = () => {};


tareasController.newTarea = (req, res) => {
    if (!(req.body.titulo && req.body.fechaLimite && req.body.enunciado)) return res.status(400).send({ message: "Peticion incorrecta al servidor" });

    let tarea = {
        id_tarea: generar.generar(49),
        id_grupo: req.headers.id_grupo,
        titulo: req.body.titulo,
        rutaArchivo: req.rutaArchivo,
        nombreArchivo: req.nombreArchivo,
        fechaLimite: req.body.fechaLimite,
        tipo: req.tipoA,
        enunciado: req.body.enunciado
    };
    modelTareas.new([tarea.id_tarea, tarea.id_grupo,
        tarea.titulo, tarea.rutaArchivo, tarea.nombreArchivo,
        tarea.fechaLimite, tarea.tipo,
        tarea.enunciado
    ], (err, rows) => {
        if (err) return res.status(500).send({ message: err });
        if (rows.affectedRows > 0) {
            res.status(200).send({ tarea });
        } else {
            return res.status(500).send({ message: "Error al crear la tarea" });
        }
    });
}

tareasController.getTareas = (req, res) => {
    let id_grupo = req.headers.id_grupo;
    modelTareas.getAll([id_grupo], (err, rows) => {
        if (err) return res.status(500).send({ message: "Error al cargar las tareas" });
        return res.status(200).send({ tareas: rows });
    });
};

tareasController.newEntrega = (req, res) => {
    if (!req.body.titulo && req.body.id_tarea) return res.status(400).send({ message: "Peticion incorrecta" });
    modelTareas.validate([req.miembro.id_miembro, req.body.id_tarea], (err, rows) => {
        if (err) return res.status(500).send({ message: "Error al conectar" });
        if (rows.length > 0) {
            return res.status(400).send({ message: "Ya enviaste esta tarea" });
        }
    });
    let entrega = {
        id_entrega: generar.generar(49),
        titulo: req.body.titulo,
        enunciado: req.body.enunciado,
        id_miembro: req.miembro.id_miembro,
        rutaArchivo: req.rutaArchivo,
        nombreArchivo: req.nombreArchivo,
        tipo: req.tipoA,
        id_tarea: req.body.id_tarea
    }
    modelTareas.send([entrega.id_entrega, entrega.id_tarea, entrega.id_miembro,
        entrega.titulo, entrega.enunciado, entrega.nombreArchivo,
        entrega.rutaArchivo, entrega.tipo
    ], (err, rows) => {
        if (err) return res.status(500).send({ message: err });
        if (rows.affectedRows > 0) {
            return res.status(200).send({ entrega });
        } else {
            return res.status(500).send({ message: "Error al enviar tu tarea" });
        }
    });
}

tareasController.getEntregas = (req, res) => {
    if (!req.params.id_tarea) return res.status(400).send({ message: "Peticion incorrecta" });
    let id_tarea = req.params.id_tarea;

    modelTareas.getH([id_tarea], (err, rows) => {
        if (err) return res.status(500).send({ message: err });
        return res.status(200).send({ entregas: rows[0], id_tarea: id_tarea });
    });
}
tareasController.validateEntrega = (req, res) => {
    console.log(req.miembro.id_miembro);
    console.log(req.params.id_tarea);
    modelTareas.validate([req.miembro.id_miembro, req.params.id_tarea], (err, rows) => {
        if (err) return res.status(500).send({ message: "Error" });
        console.log(rows);
        if (rows.length > 0) {

            res.status(200).send({ validate: false });
        } else {
            res.status(200).send({ validate: true });
        }

    });
};
module.exports = tareasController;