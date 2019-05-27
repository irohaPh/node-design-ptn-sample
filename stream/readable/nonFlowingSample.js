process.stdin
  .on('readable', () => {
    let chunk;
    console.log('New data abailable');
    let i = 0;
    while((chunk = process.stdin.read()) !== null) {
      console.log(`Chunk read: (${chunk.length}) "${chunk.toString()}"`);
      i++;
    }
    console.log(`Read Count: ${i}`);
  })
  .on('end', () => {
    process.stdout.write('End of stream\n');
  });