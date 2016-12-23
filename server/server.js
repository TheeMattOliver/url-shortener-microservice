var express = require('express')
var path = require('path')
var bodyparser = require('body-parser')
var db = require('./db/db.js')
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

app.post('/', (req, res) =>{
  /* something here */
})

app.listen(port, () => {
	console.log('The magic\'s happening on port: ', port);
})


