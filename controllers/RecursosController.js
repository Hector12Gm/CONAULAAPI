'use strict'
var resourceModel = require('../models/resourcesModel');
var constantes = require('../middlewares/constantesConaula');
var generar = require('../middlewares/mdGIds');

let resourceController = () => {

};

resourceController.newResource = (req, res) => {
    if (req.file != undefined) {
        let resource = {
            id_recurso: generar.generar(49),
            id_grupo: req.headers.id_grupo,
            nombreArchivo: req.file.originalname,
            rutaArchivo: constantes.ip + req.file.filename,
        };

        resourceModel.new([resource.id_recurso,
            resource.id_grupo, resource.nombreArchivo, resource.rutaArchivo
        ], (err, rows) => {
            if (err) return res.status(500).send({ message: err });
            if (rows.affectedRows > 0) {
                return res.status(200).send({ res: resource });
            } else {
                return res.status(500).send({ message: "Error no se guardo el recurso" });
            }
        });
    } else {
        return res.status(400).send({ message: "Peticion incorrecta" });
    }

};
resourceController.getAll = (req, res) => {
    resourceModel.getAll([req.headers.id_grupo], (err, rows) => {
        if (err) return res.status(500).send({ message: "Erro al consultar" });
        return res.status(200).send({
            recursos: rows
        });
    });
};

module.exports = resourceController;