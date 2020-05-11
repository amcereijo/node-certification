const assert = require('assert');
const sinon = require('sinon');

const obj = {
  fn: () => {},
};

beforeAll(() => {
  sinon.stub(obj, 'fn').returns(Promise.reject(new Error('test')));
});

it('works', () => obj.fn().catch((err) => {
  assert.equal(err.message, 'test');
}));

process.on('unhandledRejection', (error, promise) => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
  console.log('unhandledRejection', promise);
});

it('wait', () => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 3000);
}));
