var express = require('express')
var path = require('path')
var bodyparser = require('body-parser')
var db = require('./db/db.js');
var Link = require('./db/link.js')
var util = require('./util/utility.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/client'));


if(!process.env.dbUrl) {
var mlab = require('./env/config.js')
  } else {
  var mlab = 'https://shortenurlpls.herokuapp.com/:${process.env.PORT}/dbUrl'  
}

var port = process.env.PORT || 3000;



app.get('/', (req, res) => {
  /* something here for serving index */
})

// Redirect:
app.get('/:shortCode', (req, res) => {
  // parse the input code
  let shortCode = parseInt(req.params.shortCode);
  if (isNan) {
    res.status(500).json({error: 'Invalid URL shortCode. Must be a number.'})
  } else {
    Link.findOne({ shortCode }).then(doc => {
      if (!doc) {
        res.status(404).json({ error: 'Page not found' });
      } else {
        // if record found in database, redirect to that URL
        res.redirect(doc.originalUrl);
      }
    });
  }
});




// takes a URL and creates a MongoDB entry with a shortcode that we assign for reference:
app.get('/new/*', (req, res) =>{
  console.log(req.params[0]);
  var url = req.params[0];
  if (util.isValidUrl(url)) {
    // check for duplicates
    util.isDuplicate(url).then(shortCode => {
      // if already shortened, return existing entry
      if (shortCode) {
        res.status(200).json({
          error: 'URL already exists in the database!',
          url: `http://www.example.com/${shortCode}`
        })
      } else {
        // otherwise, create new entry and return it
        util.insertNew(url).then(insertedDocument => {
          if(!insertedDocument) {
            res.status(500).json({error: 'Unknown error'})
          } else {
            res.status(200).send('URL successfully shortened: http://www.example.com/${insertedDocument.shortCode}');
          }
        });
      }
    }); 
  } else {
    res.status(500).json({error: 'Invalid URL format. Please use the format: http(s)://(www.)domain.ext(/)(path)'});
  }
})


app.listen(port, () => {
	console.log('The magic\'s happening on port: ', port);
})


