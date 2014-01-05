var i3c = require('../');
var should = require('should');
var override = require('mock-fun').override;
var restore = require('mock-fun').restore;

describe('createClient', function() {
  it('should return an I3Client', function() {
    i3c.createClient().should.be.an.instanceOf(i3c.I3Client);
  });
});

describe('Client', function() {
  describe('#getSocketPath', function() {
    var client, execFile;
    var exec = function() { execFile.apply(this, arguments); };
    beforeEach(function() {
      client = i3c.createClient({ execFile: exec });
      override(client, 'execFile', exec)();
    });
    afterEach(function() {
      restore(client, 'execFile')();
    });
    it('should query name from i3', function() {
      execFile = function(a, b, c) { c(null, ''); };
      client.getSocketPath(function(err, cb) {
        client.execFile.called.should.be.true;
      });
    });
    it('should execute `i3 --get-socketpath`', function() {
      execFile = function(cmd, args, cb) {
        cmd.should.equal('i3');
        args.should.be.an.Array;
        args[0].should.equal('--get-socketpath');
        cb(null, '');
      };
      client.getSocketPath(function() {});
    });
    it('should fail if execFile fails', function() {
      execFile = function(a, b, c) { c({}); };
      client.getSocketPath(function(err) {
        should.exist(err);
      });
    });
    it('should parse exec output', function() {
      execFile = function(a, b, c) { c(null, ' abc   \n'); };
      client.getSocketPath(function(err, path) {
        path.should.equal('abc');
      });
    });
    it('should not call exec twice', function() {
      client.getSocketPath(function() {});
      client.getSocketPath(function() {
        client.execFile.calledTimes.should.equal(1);
      });
    });
  });
});
