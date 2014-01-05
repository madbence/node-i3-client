exports.createClient = function createClient() {
  return new Client();
};

function Client(opts) {
  opts = opts || {};
  this.execFile = opts.execFile || require('child_process').execFile;
  this.net = opts.net || require('net');
}

Client.prototype.getSocketPath = function getSocketPath(cb) {
  if(this.socketPath) {
    return cb(null, this.socketPath);
  }
  var self = this;
  this.execFile('i3', ['--get-socketpath'], function(err, out) {
    if(err) {
      return cb(err);
    }
    self.socketPath = out.toString().trim();
    return cb(null, self.socketPath);
  });
};

exports.I3Client = Client;
