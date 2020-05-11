const { fork } = require('child_process');

const interval = setInterval(() => {
  process.stdout.write('.');
}, 100);

console.log('Init index');

const longRun = fork(`${__dirname}/long-run-fork.js`);

longRun.on('message', (data) => {
  console.log('Long run eneded with', data);
});
longRun.on('exit', () => {
  clearInterval(interval);
});

longRun.send('[Test]');

console.log('End index');
