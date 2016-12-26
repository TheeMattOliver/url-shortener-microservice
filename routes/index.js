var express = require('express');
var router = express.Router();


var mongodb = require('mongodb');
if(!process.env.dbUrl) {

var mlab = require('../env/config.js')
  } else {
  var mlab = 'https://shortenurlpls.herokuapp.com/:${process.env.PORT}/dbUrl'  
}

var MongoClient = mongodb.MongoClient;

var shortid = require('shortid');
var validUrl = require('valid-url');

var port = process.env.PORT || 3000;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// :url(*) allows us to pass in properly formatted links
router.get('/new/:url(*)', function(req, res, next) {  
  
  MongoClient.connect(mLab, function(err, db) {
      if (err) {
        console.log("Unable to connect to the server", err);
      } else {
        console.log("Connected to server")
        var collection = db.collection('links');
        var params = req.params.url;
      };
  }); 

  var newLink = function(db, callback) {
    var insertLink = { url: params, short: "test" };
    collection.insert([insertLink]);
    res.send(params);
  };

  newLink(db, function() {
    db.close();
  });

  
});




module.exports = router;
