'use strict'
var connection = require('./ConnectionBDConaula');

let resourceModel = () => {};
/*
Create table recursosGrupo(
id_recurso char(50) primary key,
id_grupo char(50) not null,
nombreArchivo text not null,
rutaArchivo text not null,
foreign key (id_grupo) references grupos(id_grupo)
);
 */
resourceModel.new = (data, cb) => {
    connection.query('Insert into recursosGrupo values(?,?,?,?)', data, cb);
};
resourceModel.getAll = (data, cb) => {
    connection.query('Select * from recursosGrupo where id_grupo=?', data, cb);
}
module.exports = resourceModel;