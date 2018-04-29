'use strict'
var express = require("express");
var router = express.Router();
var groupsController = require('../controllers/groupsController');


router.post("/newGroup", groupsController.newGroup);
router.get("/getAll", groupsController.getAll);

module.exports = router;