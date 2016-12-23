var mongoose = require('./db.js');

var Schema = mongoose.Schema;

const linkSchema = new Schema({
  id : Number,
  url : {
  	type: String,
  	validate: {
  		validator: (link) => link.length > 3,
      message: 'Link must be longer than 3 characters.'
  	},
    required: [true, 'Link is required.']
  }
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;


