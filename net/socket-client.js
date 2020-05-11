const net = require('net');

let client;

function tryConnection() {
  try {
    client = net.createConnection({ port: 1337 }, () => {
      client.write('Hello from client');
    });

    client.on('error', (e) => {
      console.log('err:', e);
      setTimeout(() => {
        tryConnection();
      }, 1000);
    });

    client.on('data', (data) => {
      console.log('Data from server => ', String(data));
    });

    client.on('end', () => {
      console.log('Client disconnected from server');
      tryConnection();
    });
  } catch (ee) {
    console.log('exception: ', ee);
    setTimeout(() => {
      tryConnection();
    }, 1000);
  }
}

tryConnection();
