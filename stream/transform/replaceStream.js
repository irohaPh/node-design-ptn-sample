const stream = require('stream');
const util = require('util');

class ReplaceStream extends stream.Transform {
  constructor(searchString, replaceString) {
    super();
    this.searchString = searchString;
    this.replaceString = replaceString;
    this.tailPiece = '';
  }

  _transform(chunk, encoding, callback) {   // _writeと同じ引数を取る
    const pieces = (this.tailPiece + chunk).split(this.searchString);
    const lastPiece = pieces[pieces.length -1];
    const tailPieceLen = this.searchString.length -1;

    this.tailPiece = lastPiece.slice(-tailPieceLen);
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen);

    this.push(pieces.join(this.replaceString)); // _readと同じように内部バッファへ書き出す
    callback();
  }

  _flush(callback) {  // ストリーム終了時に呼び出される
    this.push(this.tailPiece);  // 最後の内部バッファ書き出し
    callback();
  }
}

module.exports = ReplaceStream;