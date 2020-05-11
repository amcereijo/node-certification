const { spawn } = require('child_process');

const child = spawn('echo $NAME & find . -type f | wc -l', {
  stdio: 'inherit',
  shell: true,
  cwd: '../../',
  env: { NAME: 'Angel' },
  detached: true,
});

child.on('exit', (code, signal) => {
  console.log(`process child exited with ${code} and ·${signal}`);
});

// playing with "detached" - main process can ends before child process
child.unref();
