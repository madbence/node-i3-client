var i3c = require('../');
var should = require('should');

describe('createClient', function() {
  it('should return an I3Client', function() {
    i3c.createClient().should.be.an.instanceOf(i3c.I3Client);
  });
});
