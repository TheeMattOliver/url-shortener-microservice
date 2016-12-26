var express = require('express');
var mongodb = require('mongodb');
var shortid = require('shortid');
var validUrl = require('valid-url');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// :url(*) allows us to pass in properly formatted links
router.get('/new/:url(*)', function(req, res, next) {
  console.log("trying out the get request:", req.params.url)
  res.send(req.params.url);
});

module.exports = router;
