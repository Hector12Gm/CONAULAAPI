var groupsModel = require('../models/groupsModel');
var membersModel = require('../models/membersGroupModel');
var generador = require('../middlewares/mdGIds');

var groupsController = () => {};
const AMDIN = 1;
const NORMAL = 0;

groupsController.newGroup = (req, res) => {

    if (!req.body.nombre_grupo) return res.status(400).send({ message: "Peticion no correcta" });
    let grupo = {
        id_grupo: generador.generar(10),
        nombre: req.body.nombre_grupo,
        nombre_usuario: req.user.sub
    };
    groupsModel.validate([grupo.nombre_usuario, grupo.nombre], (err, rows) => {
        if (err) return res.status(404).send({ message: err });
        if (rows.length > 0) {
            return res.status(500).send({ message: "Grupo Duplicado" });
        } else {
            groupsModel.new([grupo.id_grupo, grupo.nombre, grupo.nombre_usuario], (erra, dataa) => {
                if (erra) return res.status(404).send({ message: err });
                if (dataa.affectedRows > 0) {
                    let id_miembro = generador.generar(49);
                    membersModel.new([id_miembro, grupo.nombre_usuario, grupo.id_grupo, AMDIN], (error, rowsa) => {
                        if (error) {
                            groupsModel.delete([grupo.id_grupo], (errp, datos) => {
                                return res.status(500).send({ message: "No se creo el grupo" });
                            });
                        } else {
                            if (rowsa.affectedRows > 0) {
                                return res.status(200).send({ grupo: grupo });
                            } else {
                                groupsModel.delete([grupo.id_grupo], (errp, datos) => {
                                    return res.status(500).send({ message: "No se creo el grupo" });
                                });
                            }
                        }
                    });
                } else {
                    return res.status(500).send({ message: "Error al insertar" });
                }
            });
        }
    });


};
groupsController.getAll = (req, res) => {
    groupsModel.selectAll([req.user.sub], (err, rows) => {
        if (err) return res.status(404).send({ message: err });
        if (rows.length > 0) {
            return res.status(200).send({ rows: rows });
        } else {
            return res.status(500).send({ message: "No hay grupo disponibles" });
        }
    });
};
module.exports = groupsController;