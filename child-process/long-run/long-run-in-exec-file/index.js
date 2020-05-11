const { execFile } = require('child_process');

const interval = setInterval(() => {
  process.stdout.write('.');
}, 100);

console.log('Init index');

const longRun = execFile('node', ['long-run-exec-file.js'], {
  cwd: __dirname,
  env: { PATH: process.env.PATH, NAME: 'Run_in_exec_file' },
}, (err, data) => {
  if (err) {
    throw err;
  }
  console.log('-- Total data writen in sub-task:', data);
  clearInterval(interval);
});

longRun.stdout.on('data', (data) => {
  console.log('\nData from long task:', data);
});

longRun.stdin.write('[Test]');

console.log('End index');
