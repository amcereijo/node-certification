// process.on('unhandledRejection', (err, promise) => {
//   console.log('Handled rejection promise:', err);
//   console.log('Handled rejection promise:', promise);
// });

function callError() {
  // without process.on('unhandledRejection' error will be silent with a warning
  Promise.reject(new Error('Unhandled Error'));
}

setTimeout(() => {
  // without process.on('uncaughtException', this will nor work
  console.log('Error not break the flow');
}, 1000);

callError();
