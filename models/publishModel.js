'use strict'
var connection = require('../models/ConnectionBDConaula');
var moment = require('moment');
let publishModel = () => {};

publishModel.new = (data, cb) => {
    connection.query("Insert into  PublicacionesGrupo values(?,?,?,?,?,?,?,?)", data, cb);
};

publishModel.selectAll = (data, cb) => {
    connection.query("call GetPublicacionesGrupo(?)", data, cb);
}


module.exports = publishModel;