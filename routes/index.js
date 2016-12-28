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

  db.collection('links').find().toArray((err, result) => {
    console.log("Here are the links we currently have in our database: ", result)
    
    if (err) {
    console.log("Problem getting links from database:", err)
    }
  
    res.render('index.ejs', {links: result})
  })
});

// :url(*) allows us to pass in properly formatted links in a raw query string
router.get('/new/:url(*)', function(req, res, next) {  
  console.log("Here's the link we're adding to the db: ", req.params[0]);
  var link = process.env.dbUrl || mLab; 
  MongoClient.connect(`${link}`, (err, db) => {
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
          res.json({ original_url: params, short_url: 'https://shortenurlpls.herokuapp.com/' + shortCode});

        } else {
          res.status(500).json({ error: "Sorry, wrong url format. Please make sure you're passing a valid protocol for a real website."})
        }
      };

        newLink(db, function() {
          db.close();
        }); 
      };

  }); //<-- end MongoClient.connect
}); //<-- end router.get('/new/:url(*)')

router.get('/:short', function(req, res, next) {
  var link = process.env.dbUrl || mLab; 
  MongoClient.connect(`${link}`, function(err, db) {
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

// Handle POST
router.post('/api/shorten', (req, res) => {
console.log("Here's the link we're adding to the db: ", req.body.url);
  var link = process.env.dbUrl || mLab; 
  MongoClient.connect(`${link}`, (err, db) => {
      if (err) {
        console.log("Unable to connect to the server", err);
      } else {
        console.log("Connected to server")
        
        var collection = db.collection('links');
        var params = req.body.url;
        
        var newLink = function(db, callback) {
        if (validUrl.isUri(params)) {
          var shortCode = shortid.generate();
          var newUrl = {url: params, short: shortCode};

          collection.insert([newUrl]);
          res.json({ original_url: params, short_url: 'https://shortenurlpls.herokuapp.com/' + shortCode});

        } else {
          res.status(500).json({ error: "Sorry, wrong url format. Please make sure you're passing a valid protocol for a real website."})
        }
      };

        newLink(db, function() {
          db.close();
        }); 
      };

  }); //<-- end MongoClient.connect
})







module.exports = router;
