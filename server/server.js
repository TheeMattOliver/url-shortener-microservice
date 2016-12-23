var express = require('express')
var path = require('path')
var bodyparser = require('body-parser')
var db = require('./db/db.js');
var util = require('./util/utility');
var mongoose = require('mongoose');

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

var link = process.env.dbUrl || mlab.dbUrl;


app.get('/', (req, res) => {
  /* something here */
})

app.get('/new/*', (req, res) =>{
  console.log(req.params[0]);
  var url = req.params[0];
  if (isValidUrl(url)) {
    // check for duplicates
    // if already shortened, return existing entry
    // otherwise, create new entry and return it
  } else {
    res.status(500).json({error: 'Invalid URL format. Please use the format: http(s)://(www.)domain.ext(/)(path)'});
  }
})

app.post('/links', (req, res) =>{
  /* something here */
  var url = req.body.url;

  if (!util.isValidUrl(url)){
    console.log('Sorry, please enter a valid url. That is not a valid url: ', url);
    return res.sendStatus(404);
  }

  db.collection('links').save(req.body, (err, result) => {
    if (err) {
      throw err;
    console.log('Error creating your link.', err);
    } else {
      console.log('Link saved to the database!');
      // Once we save quote, redirect user to '/', which causes browser to reload
      res.redirect('/')
    }
  })

  console.log('req.body ', req.body);

})



app.listen(port, () => {
	console.log('The magic\'s happening on port: ', port);
})


