const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

// 暗号化・復号
const crypto = require('crypto');
const key = Buffer.from('bFr3r5iRkiTWf3r-a8GsHVZUgpAtDL7X', 'utf8'); //鍵256bit
const iv = Buffer.from('5xWAzpRh6TgybfGd', 'utf8');  //初期化ベクトル128bit

const server = http.createServer((req, res) => {
  const filename = req.headers.filename;
  console.log(`File request received: ${filename}`);

  req
    .pipe(crypto.createDecipheriv('aes-256-cbc', key, iv))  // 復号
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(filename))
    .on('finish', () => {
      res.writeHead(201, {'Content-Type': 'text/plain'});
      res.end('That\'s it.\n');
      console.log(`File saved: ${filename}`);
    })
});

console.log(`Current path: ${process.cwd()}`);
server.listen(3000, () => console.log('Listening...'));
