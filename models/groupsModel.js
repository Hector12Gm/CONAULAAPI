'use strict'
var connection = require('./ConnectionBDConaula');
let groups = () => {}
groups.new = (data, cb) => {
    connection.query("Insert into grupos values(?,?,?)", data, cb);
};
groups.validate = (data, cb) => {
    connection.query("Select * from grupos where nombre_usuario=? AND nombre=? ", data, cb);
};

groups.selectAll = (data, cb) => {
    connection.query("Select * from grupos where nombre_usuario=?", data, cb);
};

groups.delete = (data, cb) => {
    connection.query("Delete from grupos where id_grupo=?", data, cb);
}
module.exports = groups;