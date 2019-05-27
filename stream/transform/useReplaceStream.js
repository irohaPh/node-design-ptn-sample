const ReplaceStream = require('./replaceStream');

const rs = new ReplaceStream('World', 'Node.js');
rs
  .on('data', chunk => {
    console.log(chunk.toString())  // 2, 4, 6, 8
  })
  .on('end', () => {
    console.log('\nEnd of stream\n'); // 9
  });

rs.write('Hello, World! World');  // 1
rs.write(' is Beautiful. ');      // 3
rs.write('World!!');              // 5
rs.end();                         // 7
