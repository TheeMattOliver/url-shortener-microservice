var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('secure-filters').configure(require('ejs'));

var MongoClient = require('mongodb').MongoClient

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

if(!process.env.dbUrl) {
var mLab = require('../env/config').dbUrl;
  } else {
var mLab = 'https://shortenurlpls.herokuapp.com/:${process.env.PORT}/dbUrl'  
}

var port = process.env.PORT || 3000;
// move our `app.listen` function into the connect method
var link = process.env.dbUrl || mlab.dbUrl;
MongoClient.connect(`${link}`, (err, database) => {
  db = database;
  if (err) {
    throw err;
    console.log("Connection error :", err)
  } else {
    app.listen(port, () => {
    console.log('listening on: ', port)
  })
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

module.exports = app;
