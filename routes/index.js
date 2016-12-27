var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var config = require('../env/config');
if(!process.env.dbUrl) {
var mLab = config.dbUrl;
  } else {
  var mLab = 'https://shortenurlpls.herokuapp.com/:${process.env.PORT}/dbUrl'  
}

var MongoClient = mongodb.MongoClient;

var shortid = require('shortid');
// removes underscores and dashes from possible characterlist
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

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
        var params = req.params[0];
        
        var newLink = function(db, callback) {
        // test:
        //   var insertLink = { url: params, short: "test" };
        //   collection.insert([insertLink]);
        //   res.send(params);
        // };

        if (validUrl.isUri(params)) {
          var shortCode = shortid.generate();
          var newUrl = {url: params, short: shortCode};

          collection.insert([newUrl]);
          res.json({ original_url: params, short_url: 'mongodb://localhost:3000/' + shortCode})
        } else {
          res.status(500).json({ error: "Sorry, wrong url format. Please make sure you're passing a valid protocol for a real website."})
        }
      };

        newLink(db, function() {
          db.close();
        }); 
      };
  });  
}); //<-- end router.get('/new/:url(*)')

router.get('/:short', function(req, res, next) {

  MongoClient.connect(mLab, function(err, db) {
    if (err) {
        console.log("Unable to connect to the server", err);
      } else {
        console.log("Connected to server")
      }

      var collection = db.collection('links');
      var params = req.params.short;

      var findLink = function (db, callback) {
        collection.findOne({ "short": params }, { url: 1, _id: 0 }, function(err, doc) {
          if (doc != null) {
            // if a document is found, we return the doc and redirect browser to value of the returned key/value pair
            res.redirect(doc.url);
          } else {
            res.json({error: "No corresponding shortlink found in the database."})
          };
        });
      };

      findLink(db, function() {
        db.close();
      })
  })

})


module.exports = router;
