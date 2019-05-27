const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends stream.Writable {
  constructor() {
    super({
      objectMode: true,
      highWaterMark: 16 * 1024, // Default: 16KB
      decodeStrings: true       // Default: true _write()に渡す前に文字列を自動的にデコードしてバイナリバッファに入れる。オブジェクトモードでは無視される
    });
  }

  _write(chunk, encoding, callback) {
    mkdirp(path.dirname(chunk.path), err => {
      if (err) {
        return callback(err);
      }

      fs.writeFile(chunk.path, chunk.content, callback);
    });
  }
}

module.exports = ToFileStream;