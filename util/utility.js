var request = require('request');
var link = require('../db/link.js')

exports.getUrlTitle = (url, callback) => {
	request(url, (err, res, html) => {
    if (err) {
      console.log('Sorry, there was a problem reading the url heading: ', err);
      return callback(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return callback(err, title);
    }
  })
}

// Check url
var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

// Check for duplicates
exports.isDuplicate(url) {
  return link
    .findOne({ originalUrl: url})
     .then(doc => {
      return doc ? doc.shortCode : false;
     });
}
