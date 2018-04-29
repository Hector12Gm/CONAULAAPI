'use strict'
var connection = require('./ConnectionBDConaula');

let member = () => {

};

member.new = (data, cb) => {
    connection.query("Insert into miembrosGrupo values(?,?,?)", data, cb);
};

member.validate = (data, cb) => {
    connection.query('Select * from miembrosgrupo where id_grupo=? AND nombre_usuario=?', data, cb);
};

member.selectAll = (data, cb) => {
    connection.query("Select * from miembrosgrupo where id_grupo=?", data, cb);
}

member.selectOne = (data, cb) => {
    connection.query("Select id_miembro from miembrosgrupo where nombre_usuario=? AND id_grupo=?",
        data, cb);
};
module.exports = member;