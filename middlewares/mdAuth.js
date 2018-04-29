'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
const SECRET = "arriba_el_nyan_cat_por_que_es_kawai_de_su_ne_oni_chan";

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "La peticion no tiene la cabezera de autenficacion" });
    }
    let token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        let payload = jwt.decode(token, SECRET);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: "El token ha caducado" });
        }
        req.user = payload;
        next();
    } catch (ex) {
        return res.status(404).send({ message: ex });
    }

}