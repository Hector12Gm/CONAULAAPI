'use strict'
var membersModel = require('../models/membersGroupModel');
var generador = require('../middlewares/mdGIds');
const AMDIN = 1;
const NORMAL = 0;
let membersController = () => {};

membersController.joinGroup = (req, res) => {
    if (!req.params.id_grupo) return res.status(400).send({ message: "Peticion incorrecta" });
    let miembro = {
        id_miembro: generador.generar(49),
        nombre_usuario: req.user.sub,
        id_grupo: req.params.id_grupo,
        tipo: NORMAL
    };

    membersModel.validate([miembro.id_grupo, miembro.nombre_usuario], (err, rows) => {
        if (err) return res.status(400).send({ message: "Peticion incorrecta" });
        if (req.id_miembro) return res.status(400).send({ message: "Ya eres parte de este grupo" });
        if (rows.length > 0) {
            return res.status(500).send({ message: "Ya estas registrado" });
        } else {
            membersModel.new([miembro.id_miembro,
                miembro.nombre_usuario, miembro.id_grupo, miembro.tipo
            ], (err, rows) => {
                if (err) return res.status(500).send({ message: "Error fatal checa tu conexion" });
                if (rows.affectedRows > 0) {
                    return res.status(200).send({ miembro });
                } else {
                    return res.status(500).send({ message: "Ocurrio un error al unirte" });
                }
            });

        }
    });
};

module.exports = membersController;