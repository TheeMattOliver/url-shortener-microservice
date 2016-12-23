var express = require('express')
var path = require('path')
var bodyparser = require('body-parser')

var app = express();

var MongoClient = require('mongodb').MongoClient

var port = process.env.PORT || 3000;
// eventually we'll be calling our `app.listen` function in the db connect method
// var link = process.env.dbUrl || mlab.dbUrl;
// MongoClient.connect(`${link}`, (err, database) => {
//   db = database;
//   if (err) {
//     throw err;
//     console.log("Connection error :", err)
//   } else {
//     app.listen(port, () => {
//     console.log('listening on: ', port)
//   })
//   }
// })

app.get('/', (req, res) => {

})



app.listen(port, () => {
	console.log('The magic\'s happening on port: ', port);
})


