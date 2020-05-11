const { EventEmitter } = require('events');

const myEventEmiter = new EventEmitter();

process.on('uncaughtException', (err) => {
  console.log('uncaughtException - Catch event error:', err);
});

// need process.on('uncaughtException', ...  if not ".on('error'" in emiter
// myEventEmiter.on('error', (err) => {
//   console.log('myEventEmiter - Catch event error:', err);
// });

setTimeout(() => {
  /*
    If no:
      * process.on('uncaughtException', (err) => {})
      or
      * myEventEmiter.on('error', (err) => {}
    this will not work
  */
  console.log('Final message');
}, 1000);

// if next line goes before "setTimeout", that is not going to be executed
myEventEmiter.emit('error', new Error('unhandled error event'));
