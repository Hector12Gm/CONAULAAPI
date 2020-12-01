var connection = require('./ConnectionBDConaula');

let examenesModel = () => {};

examenesModel.new = (data, cb) => {
    connection.query('Insert into examenes values(?,?,?,?)', data, cb);
};
examenesModel.validate = (data, cb) => {
    connection.query('select * from calificacionesexamen where id_miembro=? and id_examen=?',
        data, cb);
};
examenesModel.newPregunta = (data, cb) => {
    connection.query('Insert into preguntasExamen values(?,?,?,?,?,?)', data, cb);
};
examenesModel.test = (data, cb) => {
    connection.query('Insert into calificacionesexamen values(?,?,?,?)', data, cb);
};
examenesModel.getCali = (data, cb) => {
    connection.query('call getCalificaciones(?)', data, cb);
};
examenesModel.getCaliRes = (data, cb) => {
    connection.query("call getResumen(?)", data, cb);
};
examenesModel.getPreguntas = (data, cb) => {
    connection.query('Select * from preguntasexamen where id_examen=?', data, cb);
};
examenesModel.getExamenes = (data, cb) => {
    connection.query("Select * from examenes where id_grupo=?", data, cb);
};
module.exports = examenesModel;