var request = require('request');
var Link = require('../db/link.js')

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
exports.isDuplicate = function(url) {
  return Link
    .findOne({ originalUrl: url})
     .then(doc => {
      return doc ? doc.shortCode : false;
     });
}

// Return a new shortened URL
exports.getShortCode = function() {
  return Link
  // search without criteria
   .find()
   // sort by shortCode in descending order
   .sort({ shortCode: -1})
   // only return the first match
   .limit(1)
   // only return the shortCode field
   .select({ _id: 0, shortCode: 1})
   // if document found, return its shortCode plus 1, 
   // otherwise return 0
   .then(docs => {
     return docs.length === 1? docs[0].shortCode + 1 : 0;
   });
}


// call getShortCode and insert new document for the given URL
exports.insertNew = function(url) {
  return getShortCode().then(newCod => {
    // create new UrlEntry using mongoose model
    let newUrl = new Link({ originalUrl: url, shortCode: newCode });
    // return promise generated by save()
    return newUrl.save();
  })
}

// Return a compelling shortened URL:
exports.createFullUrl = function(req, shortCode) {
  return `${req.protocol}: //${req.hostname}:${getPort()}/${shortCode}`;
}

function getPort() {
  return process.env.PORT || 8000;
}
