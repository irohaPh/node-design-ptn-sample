process.stdin
  .on('data', chunk => {
    console.log('New data abailable');
    console.log(`Chunk read: (${chunk.length}) "${chunk.toString()}"`);
  })
  .on('end', () => {
    process.stdout.write('End of stream\n');
  });