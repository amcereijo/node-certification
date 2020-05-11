process.on('message', (data) => {
  console.log('Mesage from parent %j', data);
});

let counter = 0;
const limit = 10;
setInterval(() => {
  if (counter < limit) {
    process.send({ counter: counter += 1 });
  } else {
    process.send({ end: true });
  }
}, 1000);
