'use strict'
var connection = require('./ConnectionBDConaula');
let groups = () => {}
groups.new = (data, cb) => {
    connection.query("Insert into grupos values(?,?,?)", data, cb);
};
groups.validate = () => {
    connection.query("Select * from miembrosGrupo where nombre_usuario=? AND nombre=?", data, cb);
};
module.exports = groups;