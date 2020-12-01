var express = require("express");
var router = express.Router();
var mdAuth = require('../middlewares/mdAuth');
var usersController = require("../controllers/userController");
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var uploadS = multer({ storage: storage }).single("file");

router.get("/prueba", (req, res) => {
    res.status(200).send({ message: "Hola mundo" });
});
router.post("/newUser", usersController.newUser);
router.post("/loginUser", usersController.loginUser)
router.post("/pr", mdAuth.ensureAuth, (req, res) => {
    res.send(200);
});

router.put("/updateImg/:nombre_usuario", uploadS, usersController.updateImg);
module.exports = router;