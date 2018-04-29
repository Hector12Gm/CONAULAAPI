'use strict'
var connection = require('../models/ConnectionBDConaula');

var user = () => {

}

user.insert = (data, cb) => {
    connection.query("Insert into usuarios values(?,?,?,?,?)", data, cb);
};

user.login = (data, cb) => {
    connection.query("Select * from usuarios where nombre_usuario = ?", data, cb);
}
module.exports = user;