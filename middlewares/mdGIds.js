'use strict'

var objeto = () => {};
objeto.generar = (tamaño) => {
    var s = "ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwyz0123456789";
    var resultado = "";
    for (var i = 0; i <= tamaño; i++) {
        var numero = Math.floor(Math.random() * s.length);
        resultado = resultado + s[numero];
    }
    return resultado;
}
module.exports = objeto;