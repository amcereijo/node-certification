
process.once('message', (data) => {
  console.log('fork start for', data);
  for (let i = 0; i < 9000000000; i += 1) { /* do nothing */ }
  console.log('\nfork ends for', data);
  process.send('Finish!');
});
