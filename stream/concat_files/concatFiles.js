const fromArray = require('from2-array'); // 配列からReadableストリームを簡単に作れるライブラリ
const through = require('through2');      // Transformストリームを簡単に作れるライブラリ
const fs = require('fs');

function concatFiles(destination, files, callback) {
  const destStream = fs.createWriteStream(destination); // 複数ファイルをマージしたファイルを作成するストリーム
  fromArray.obj(files)
    .pipe(
      through.obj((file, enc, done) => {  // Transformストリームなので _writeと同じ引数を取る
        const src = fs.createReadStream(file);  // 処理するファイル毎にReadableストリームを作成
        src.pipe(destStream, {end: false});     // 複数のファイルに対してdestStreamを使い回すので、end=falseを指定して勝手にクローズさせない
        src.on('end', done);
      })
    )
    .on('finish', () => {
      destStream.end();   // 全てのファイルが処理し終わったら、destStreamをクローズする
      callback();
    });
}

module.exports = concatFiles;