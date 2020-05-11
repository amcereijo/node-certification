const assert = require('assert');

// export one element
exports.name = 'Process.js';
// if module.exports = ... later, "name" will not exist quen require this module

const children = require('./children-module');

assert(children.doNothing);
assert(!children.notExists);

// not need for json extension
const { prop1, prop2 } = require('./data');

assert(prop1);
assert(prop2);

const childrenExportsNothing = require('./children-exports-nothing');

assert(!childrenExportsNothing.notExists);

const functions = Object.keys(process).filter((key) => typeof process[key] === 'function');

functions.forEach((key) => {
  console.log(key, ' => ');
});

exports.version = '1.0';
console.log('module', module);

children.assertParent();
