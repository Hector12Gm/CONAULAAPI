'use strict'
var usersModel = require('../models/usersModel');
var bcrypt = require("bcrypt-nodejs");
var jwtService = require('../services/jwt');
var usersController = () => {}
const IMGDEFAULT = "http://localhost:3000/default.png";
var constantes = require('../middlewares/constantesConaula');
var path = require('path');

usersController.newUser = (req, res) => {

    let params = req.body;
    if (params.nombre && params.nombre_usuario && params.password && params.apellidos) {
        //Iniciar
        let nombre_usuario = params.nombre_usuario;
        let password = params.password;
        let apellidos = params.apellidos;
        let nombre = params.nombre;
        console.log("Cargar");
        bcrypt.hash(password, null, null, (err, pass) => {
            if (err) return res.status(500).send({ message: err });
            password = pass;
            usersModel.insert([nombre_usuario, password, nombre, apellidos, IMGDEFAULT], (err, rows) => {
                if (err) {
                    res.status(404).send({ message: err });
                } else {
                    if (rows.affectedRows > 0) {
                        return res.status(200).send({ data: "Se inserto" });
                    } else {
                        return res.status(500).send({ message: err });
                    }
                }
            });
        });

    } else {
        res.status(400).send({ message: "Error peticion no correcta" });;
    }
};

usersController.loginUser = (req, res) => {
    let params = req.body;
    let nombre_usuario = params.nombre_usuario;
    let password = params.password;
    usersModel.login([nombre_usuario], (err, data) => {
        if (err) return res.status(404).send(err);
        let user = data[0];
        if (user) {

            bcrypt.compare(password, user.password, (err, check) => {
                if (err) return res.status(404).send(err);
                if (check) {
                    //devolver datos
                    if (params.getToken) {
                        return res.status(200).send({ token: jwtService.createToken(user) });
                    } else {
                        delete user.password;
                        return res.status(200).send({ user: user });
                    }

                } else {
                    return res.status(404).send({ message: "El usaurio no se ha podido indentificar(contraseña) " });
                }
            });
        } else {
            return res.status(404).send({ message: "El usaurio no se ha podido(nombre de usuairo)" });;
        }
    });
}
usersController.updateImg = (req, res) => {
    if (!(req.file)) return res.status(400).send({ message: "Peticion incorrecta" });
    let extencion = (path.extname(req.file.filename)).toLocaleLowerCase();

    let rutaFn = constantes.ip + req.file.filename;

    usersModel.updateImg([rutaFn, req.params.nombre_usuario], (err, rows) => {
        if (err) return res.status(500).send({ message: "Error al actualizar la imagen de usuario" });
        if (rows.affectedRows > 0) {
            return res.status(200).send({ url: rutaFn });
        } else {

            return res.status(500).send({ message: "Peticion no se actualizo tu imagen de usuario" });
        }
    });
}
module.exports = usersController;