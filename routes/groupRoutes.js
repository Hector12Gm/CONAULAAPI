'use strict'
var express = require("express");
var router = express.Router();
var groupsController = require('../controllers/groupsController');
var mdAuthMember = require('../middlewares/mdIdMiembro');

router.post("/newGroup", groupsController.newGroup);
router.get("/getAll", groupsController.getAll);
router.get("/getOne/:id_grupo", mdAuthMember.authMember, groupsController.getOne);

module.exports = router;