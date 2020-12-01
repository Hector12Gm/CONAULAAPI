var membersModel = require('../models/membersGroupModel');
var constantes = require('./constantesConaula');
//Autentificar miembro grupo
exports.authMember = (req, res, next) => {
    if (req.headers.id_grupo || req.body.id_grupo || req.params.id_grupo) {
        membersModel.selectOne([req.user.sub, req.headers.id_grupo], (err, data) => {
            if (err) return res.status(404).send({ message: err });
            if (data.length > 0) {
                req.miembro = data[0];

            } else {
                return res.status(400).send({ message: "No eres miembro del grupo" });
            }
            next();
        });
    } else {
        res.status(500).send({ message: "No tiene la cabezera correcta" });;
    }
};

//validar id_miembro
exports.authMemberAdmin = (req, res, next) => {
    if (req.miembro) {
        if (req.miembro.tipo == constantes.NORMAL) {
            res.status(400).send({ message: "No eres adminsitrador del grupo" });
        }
    } else {
        return res.status(400).send({ message: "No eres miembro del grupo" });
    }
    next();
}
exports.validateMember = (req, res, next) => {
    if (req.headers.id_grupo || req.params.id_grupo) {
        membersModel.selectOne([req.user.sub, req.headers.id_grupo], (err, data) => {
            if (err) return res.status(404).send({ message: err });
            if (data.length > 0) {
                req.id_miembro = data[0].id_miembro;
            }
            next();
        });
    } else {
        res.status(500).send({ message: "No tiene la cabezera correcta" });;
    }
};