const assert = require('assert');

// this will no exists when the module will be required
exports.notExists = 'notExists';

const { name, version } = require('./parent');

// export all in one places
module.exports = {
  doNothing: function doNothing() { /* do nothing */ },
  assertParent: function assertParent() {
    // eslint-disable-next-line global-require
    const { version: versionExported } = require('./parent');
    // at this point version is  exported in process.js
    assert(versionExported);
    console.log('Now "version" from parent exists!');
  },
};


// at this point name is already exported in process.js
assert(name);
console.log('Now "name" from parent exists!');

// at this point version is not already exported in process.js
assert(!version);
console.log('Now "version" from parent does not exist!');

function print() {
  console.log('\n--- children --- ');
  console.log('module', module);
  console.log('--- --- ---\n');
}

print();

setImmediate(print);
