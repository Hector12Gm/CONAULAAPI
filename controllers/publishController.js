'use strict'
var generador = require('../middlewares/mdGIds');
var publishModel = require('../models/publishModel');
var constanstes = require('../middlewares/constantesConaula');
var path = require('path');
var publishController = () => {};
var moment = require('moment');

publishController.newPublish = (req, res) => {

    if (req.body.titulo && req.body.enunciado) {
        let publish = {
            id_publicacion: generador.generar(49),
            titulo: req.body.titulo,
            enunciado: req.body.enunciado,
            rutaArchivo: req.rutaArchivo,
            nombreArchivo: req.nombreArchivo,
            tipo: req.tipoA,
            id_miembro: req.miembro.id_miembro,
            fecha: moment().format("YYYY-MM-DD HH:mm:ss")
        }

        publishModel.new([publish.id_publicacion, publish.titulo, publish.enunciado,
                publish.rutaArchivo, publish.nombreArchivo, publish.tipo, publish.id_miembro, publish.fecha
            ],
            (err, rows) => {
                if (err) return res.status(500).send({ message: err });
                if (rows.affectedRows > 0) {
                    res.status(200).send({ publish })
                } else {
                    res.status(500).send({ message: "No se ha podido publicar" })
                }
            });
    } else {
        return res.status(400).send({ message: "Peticion incorrecta controller" });
    }

};

publishController.getAllGroup = (req, res) => {
    let id_grupo = req.params.id_grupo;
    publishModel.selectAll([id_grupo], (err, rows) => {
        if (err) return res.status(500).send({ message: err });
        return res.status(200).send({ publishs: rows[0] });
    });
};
module.exports = publishController;