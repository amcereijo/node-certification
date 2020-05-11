const { spawn } = require('child_process');

const childFind = spawn('find', ['.', '-type', 'f']);
const childWc = spawn('wc', ['-l']);

childFind.on('exit', (code, signal) => {
  console.log(`process childFind exited with ${code} and ·${signal}`);
});


childFind.stdout.on('data', (data) => {
  console.log(`process childFind writes ${data}`);
});

childWc.on('exit', (code, signal) => {
  console.log(`process childWc exited with ${code} and ·${signal}`);
});

childWc.stdout.on('data', (data) => {
  console.log(`process childWc writes ${data}`);
});

childFind.stdout.pipe(childWc.stdin);
childWc.stdout.pipe(process.stdout);
