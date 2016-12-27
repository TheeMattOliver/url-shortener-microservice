var express = require('express');
var router = express.Router();


var mongodb = require('mongodb');
var mLab = 'https://shortenurlpls.herokuapp.com/:${process.env.PORT}/dbUrl' 

// if(!process.env.dbUrl) {
// var mLab = require('../env/config.js')
//   } else {
//   var mLab = 'https://shortenurlpls.herokuapp.com/:${process.env.PORT}/dbUrl'  
// }

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
  console.log("Here's the link we're adding to the db: ", req.params[0]);
  MongoClient.connect(mLab, function(err, db) {
      if (err) {
        console.log("Unable to connect to the server", err);
      } else {
        console.log("Connected to server")
        var collection = db.collection('links');
        var params = JSON.parse(req.params[0]);
        
        var newLink = function(db, callback) {
          var insertLink = { url: params, short: "test" };
          collection.insert([insertLink]);
          res.send(params);
        };

        newLink(db, function() {
          db.close();
        });
      
      };
  
  }); 
 
});




module.exports = router;
