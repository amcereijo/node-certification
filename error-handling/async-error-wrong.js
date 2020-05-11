process.on('uncaughtException', (err) => {
  console.log('Wrong Error handling!', err);
});

const func = () => new Promise((/* resolve, reject */) => {
  setImmediate(() => {
    // this should be return reject(new Error('opss')); to be handled in catch block
    // it will be handled by process.on('uncaughtException',..
    throw new Error('opss');
  });
});

const main = async () => {
  try {
    await func();
  } catch (ex) {
    console.log('Err will no executed: ', ex);
  }
};

main();
