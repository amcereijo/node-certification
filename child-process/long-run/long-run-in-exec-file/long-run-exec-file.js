process.stdin.on('data', (data) => {
  console.log('exec - file start for', String(data), ' with ', process.env.NAME);
  for (let i = 0; i < 9000000000; i += 1) { /* do nothing */ }
  console.log('exec - file ends for', String(data));
  // process.stdout.write('Finish!');
  process.exit(0);
});
