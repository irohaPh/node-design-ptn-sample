/**
 * 使い方
 * $ echo 任意の文字列 | node useReplaceStreamPipe 検索文字列 置換文字列
 */

const ReplaceStream = require('./replaceStream');

process.stdin
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  .pipe(process.stdout)
