const assert = require('assert');
const User = require('../server/db/link.js');

describe('Creating records', () => {
  it('saves a link', (done) => {
    const google = new Link({ originalUrl: 'https://www.google.com' });
 
    google.save()
     .then(() => {
       // Has google been saved successfully?
       assert(!google.isNew);
       done();
     })
  });
});