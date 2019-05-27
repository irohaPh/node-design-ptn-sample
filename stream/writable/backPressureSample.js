const Chance = require('chance');
const chance = new Chance();

require('http')
  .createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    function generateMore() { // メインのロジックを関数にラップする
      while(chance.bool({likelihood: 95})) {
        /* ストリームにランダムな文字列を書き出す */
        const shouldContinue = res.write(
          `${chance.string({length: (16 * 1024) - 1})}\n` // バックプレッシャを受けやすくするため、highWaterMarkより少しだけ小さいサイズを書き出す
        );

        /* メモリ監視 Start */
        const used = process.memoryUsage()
        const messages = []
        for (let key in used) {
          messages.push(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
        }
        console.log(new Date(), messages.join(', '))
        /* メモリ監視 End */

        if(!shouldContinue) { // 内部バッファの上限(highWaterMark)を超えると、res.write()の戻り値(shouldContinue)がfalseとなる
          console.log('Backpressure');
          return res.once('drain', generateMore); // 内部バッファが空になったらdrainイベントが発火されるので、その時用にメインロジックの関数をリスナに登録しておく(onceは一度だけイベント発火後の実行を登録するやつ)
        }
      }
      res.end('\nThe end...\n', () => {
        console.log('All data was sent');
      });
    }

    generateMore();
  })
  .listen(8080, () => {
    console.log('Listening on http://localhost:8080');
  })
