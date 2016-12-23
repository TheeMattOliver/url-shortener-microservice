var mongoose = require('./db.js');

var Schema = mongoose.Schema;

var linkSchema = new Schema({
  id : Number,
  url : String
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
