exports.createClient = function createClient() {
  return new Client();
};

function Client(opts) {
  opts = opts || {};
  this.execFile = opts.execFile || require('child_process').execFile;
  this.net = opts.net || require('net');
}

Client.prototype.getSocketPath = function getSocketPath(cb) {
  this.execFile('i3', ['--get-socketpath'], function(err, out) {
    return cb(null, this.socketPath);
  });
};

exports.I3Client = Client;
