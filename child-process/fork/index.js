const { fork } = require('child_process');

const forked = fork(`${__dirname}/fork-child.js`);

forked.on('message', (data) => {
  console.log('Message from child %j', data);
  if (data.end) {
    forked.kill('SIGINT');
  }
});

forked.send({ hello: 'wold' });
