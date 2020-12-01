'use strict'
var connection = require('./ConnectionBDConaula');

let tareasModel = () => {};
/**
 *Create table tareas
(
	id_tarea char(50) primary key,
    id_grupo char(50),
	titulo text,
    rutaArchivo text,
    nombreArchivo text,
    fechaLimite datetime,
    foreign key (id_grupo) references grupos(id_grupo)
);
 */
tareasModel.new = (data, cb) => {
    connection.query('insert into tareas values(?,?,?,?,?,?,?,?)', data, cb);
};
/*
Create table entregaTareas(
id_entrega char(50) primary key,
id_tarea char(50),
id_miembro char(50),
titulo text,
enunciado text,
nombreArchivo text,
rutaArchivo text,
foreign key (id_tarea) references tareas(id_tarea),
foreign key (id_miembro) references miembrosgrupo(id_miembro)
);
 */
tareasModel.validate = (data, cb) => {
    connection.query('select * from entregaTareas where id_miembro=? and id_tarea=? ', data, cb);
};

tareasModel.getAll = (data, cb) => {
    connection.query("Select * from tareas where id_grupo=?", data, cb);
};

tareasModel.send = (data, cb) => {
    connection.query("Insert into entregaTareas values(?,?,?,?,?,?,?,?)", data, cb);
};

tareasModel.getH = (data, cb) => {
    connection.query('call getEntregas(?)', data, cb);
};
module.exports = tareasModel;