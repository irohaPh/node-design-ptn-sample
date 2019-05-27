const Chance = require('chance');
const chance = new Chance();

require('http')
  .createServer((req, res) => { // resはhttp.ServerResponseのインスタンスで、Writableストリームである
    res.writeHead(200, {'Content-Type': 'text/plain'}); // これはWritableインタフェースとは関係ない

    while(chance.bool({likelihood: 95})) {  // 5%の確率でループを終了する
      /* ストリームにランダムな文字列を書き出す */
      // res.write(`${chance.string()}\n`);
      res.write(
        `${chance.string({length: (16 * 1024) - 1})}\n`
      );

      /* メモリ監視 Start */
      const used = process.memoryUsage()
      const messages = []
      for (let key in used) {
        messages.push(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
      }
      console.log(new Date(), messages.join(', '))
      /* メモリ監視 End */
    }
    res.end('\nThe end...\n')   // endを呼び出すことで、これ委譲書き込みがないことを伝える
    res.on('finish', () => {    // finishイベントは、全てのデータがフラッシュされてソケットに書き込まれると発火する
      console.log('All data was sent');
    });
  })
  .listen(8080, () => {
    console.log('Listening on http://localhost:8080');
  })
