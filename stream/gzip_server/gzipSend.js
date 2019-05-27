const fs = require('fs');
const zlib = require('zlib');
const http = require('http');
const path = require('path');

// 暗号化・復号
const crypto = require('crypto');
const key = Buffer.from('bFr3r5iRkiTWf3r-a8GsHVZUgpAtDL7X', 'utf8'); //鍵256bit
const iv = Buffer.from('5xWAzpRh6TgybfGd', 'utf8');  //初期化ベクトル128bit

const file = process.argv[2];
const server = process.argv[3];

const options = {
  hostname: server,
  port: 3000,
  path: '/',
  method: 'PUT',
  headers: {
    filename: path.basename(file),
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip',
    // 'Content-Type': 'image/jpeg',  // 圧縮せずに送りたいなら、送るファイル形式によってこんな指定に変えて、上記2行をコメントアウト（合わせて以降の処理とサーバ側ででgzip圧縮・展開している箇所もコメントアウト）
  }  
};

const req = http.request(options, res => {
  console.log(`Server response: ${res.statusCode}`);
});

fs
  .createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipheriv('aes-256-cbc', key, iv))  // 暗号化
  .pipe(req)
  .on('finish', () => {
    console.log('File successfully set');
  })
