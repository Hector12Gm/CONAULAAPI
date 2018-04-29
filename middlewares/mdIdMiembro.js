var membersModel = require('../models/membersGroupModel');

exports.authMember = (req, res, next) => {
    if (req.headers.id_grupo) {
        membersModel.selectOne([req.user.sub, req.headers.id_grupo], (err, data) => {
            if (err) return res.status(404).send({ message: err });
            if (data.length > 0) {
                req.id_miembro = data[0].id_miembro;

            } else {
                return res.status(400).send({ message: "No eres miembro del grupo" });
            }
            next();
        });
    } else {
        res.status(500).send({ message: "No tiene la cabezera correcta" });;
    }
};

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