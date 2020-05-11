const { print, printNextTick } = require('./print-content-stream');

describe('print-content', () => {
  let interval;
  beforeAll(() => {
    interval = setInterval(() => { console.log('---'); }, 1);
  });
  afterAll(() => {
    clearInterval(interval);
  });

  it('print', async () => {
    await print(`${__dirname}/file1.txt`,
      `${__dirname}/file2.txt`,
      `${__dirname}/file3.txt`);
  });
  it('printNextTick', async () => {
    await printNextTick(`${__dirname}/file1.txt`,
      `${__dirname}/file2.txt`,
      `${__dirname}/file3.txt`);
  });
});
