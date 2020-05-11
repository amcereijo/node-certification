const func = () => new Promise((resolve, reject) => {
  setImmediate(() => reject(new Error('opss')));
});

const main = async () => {
  try {
    await func();
  } catch (ex) {
    console.log('Err will be executed: ', ex);
  }
};

main();
