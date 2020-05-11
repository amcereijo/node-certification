const net = require('net');

const socket = net.createServer((c) => {
  console.log('Connected client:');
  c.write('Hello');

  c.on('end', () => {
    console.log('Disconected client');
  });

  c.on('data', (data) => {
    console.log('server received: ', String(data));
  });
});


socket.listen(1337, () => {
  console.log('Server ready');
});
