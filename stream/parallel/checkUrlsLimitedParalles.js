/**
 * 使い方
 * $ node checkUrlsLimitedParalles チェック対象URLが列挙されたファイル名
 */

const fs = require('fs');
const split = require('split');
const request = require('request');
const LimitedParallelStream = require('./core/limitedParallelStream');

fs.createReadStream(process.argv[2])
  .pipe(split())
  .pipe(new LimitedParallelStream(2, (url, enc, done, push) => {
    if(!url) return done();
    request.head(url, (err, response) => {
      push(`${url} is ${(err ? 'down' : 'up')}\n`);
      done();
    })
  }))
  .pipe(fs.createWriteStream('results.txt'))
  .on('finish', () => {
    console.log('All urls were checked')
  })
;