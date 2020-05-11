const os = require('os');

process.on('exit', (code) => {
  console.log(`\n--- Exiting with code ${code}...`);
});

console.log('--- Starting...\n');
console.log(`Running from ${process.cwd()} with user home dir ${os.homedir}`);
console.log('Env vars:', process.env);
console.log(`Running in "${os.arch()}" Arq. for plartform "${os.platform()}" of type "${os.type()}" with ${os.cpus().length} cpus`);
console.log(`System has ${os.freemem()} bytes free memory of ${os.totalmem()} bytes`);
console.log(`Hostname: ${os.hostname()}`);
console.log('Running user %j', os.userInfo());
console.log(`Machine running for ${os.uptime()} seconds`);

process.exit(208);
