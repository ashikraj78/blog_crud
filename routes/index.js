var express = require('express');
var router = express.Router();
var Article = require("../model/Article");
var Comment = require('../model/Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
