var path = require('path');
var constantes = require('./constantesConaula');
exports.validaTipo = (req, res, next) => {
    if (req.file != undefined) {
        var ext = path.extname(req.file.path);
        if (ext == ".jpg" || ext == ".png" || ext == ".jpeg" || ext == ".JPG") req.tipoA = constantes.TIPOIMAGEN;
        if (ext == ".mp4") req.tipoA = constantes.TIPOVIDEO;
        if (ext == ".mp3") req.tipoA = constantes.TIPOSONIDO;
        if (req.tipoA == undefined) {
            req.tipoA = constantes.TIPOUNDEFINED;
        }
        req.rutaArchivo = constantes.ip + req.file.filename;
        req.nombreArchivo = req.file.originalname;
    } else {

        req.tipoA = constantes.TIPOVACIO;
        req.rutaArchivo = "NA";
        req.nombreArchivo = "NA";
    }
    next();
};