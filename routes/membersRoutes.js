'use strict'
var express = require('express');
var router = express.Router();
var membersControllers = require('../controllers/membersGroupController');
var mdMember = require('../middlewares/mdIdMiembro');

router.post("/joinGroup/:id_grupo", mdMember.validateMember, membersControllers.joinGroup);

module.exports = router;