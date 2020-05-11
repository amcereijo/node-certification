process.on('uncaughtException', (err) => {
  console.log('Error happened', err);
});

function callError() {
  throw new Error('New Error');
}

setTimeout(() => {
  // without process.on('uncaughtException', this will nor work
  console.log('Error not break the flow');
}, 1000);

callError();
