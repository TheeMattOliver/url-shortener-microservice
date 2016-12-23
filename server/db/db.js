var mongoose = require('mongoose');

if(!process.env.dbUrl) {
var mlab = require('../env/config.js') 
}
var link = process.env.dbUrl || mlab.dbUrl
mongoose.connect(`${link}`);

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Uh oh. Looks like there was a database connection error :', err);
});
db.once('open', function () {
  console.log('Connected to database!');
});


module.exports = mongoose;
