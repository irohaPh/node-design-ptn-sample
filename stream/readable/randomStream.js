const stream = require('stream');
const Chance = require('chance');

const chance = new Chance();

class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
  }

  _read(size) {
    const chunk = chance.string();  // ランダムな文字列を生成
    console.log(`Pushing chunk of size: ${chunk.length} ${chunk.toString()}`);
    this.push(chunk, 'utf8');   // 内部的な読み込み用のバッファに文字列をプッシュ（Stringをプッシュするのでエンコーディングも指定している。 ※ chunkがバイナリのBufferの場合はエンコーディング指定は不要）
    if(chance.bool({likelihood: 5})) {  // 5%の確率でストリームを終了させる
      this.push(null);  // 内部バッファにnullをプッシュすることで、EOR(ストリーム終了)を示す
    }
  }
}

module.exports = RandomStream;