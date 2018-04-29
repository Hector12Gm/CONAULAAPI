'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
let serviceToken = () => {};
const SECRET = "arriba_el_nyan_cat_por_que_es_kawai_de_su_ne_oni_chan";
serviceToken.createToken = (user) => {
    let payload = {
        sub: user.nombre_usuario,
        nombre: user.nombre,
        apellidos: user.apellidos,
        img: user.img,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }
    return jwt.encode(payload, SECRET);
}
module.exports = serviceToken;