var express = require("express");
var router = express.Router();
var mdAuth = require('../middlewares/mdAuth');
var usersController = require("../controllers/userController");
router.get("/prueba", (req, res) => {
    res.status(200).send({ message: "Hola mundo" });
});
router.post("/newUser", usersController.newUser);
router.post("/loginUser", usersController.loginUser)
router.post("/pr", mdAuth.ensureAuth, (req, res) => {
    res.send(200);
});
module.exports = router;