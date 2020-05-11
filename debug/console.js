console.profile('MyLabel');

console.assert(true, 'nothing');
console.assert(false, ' ups false');

console.count();
console.count('default');
console.count('abc');
console.count('xyz');
console.count('abc');
console.count();
console.countReset('abc');
console.count('abc');

console.dir({ data: 'data' });

console.group('test');
console.log('1 test');
console.log('2 test');
console.log('3 test');
console.groupEnd();
console.log('4 test');


console.time('process');
for (let i = 1; i < 1000000; i += 1) { /* do nothing */ }
console.timeLog('process', 'End 1º loop');
for (let i = 1; i < 1000000; i += 1) { /* do nothing */ }
console.timeEnd('process');


console.trace('Mesage!');

/*
 This method does not display anything unless used in the inspector,
 adds an event with the label 'label' to the Timeline panel of the inspector.
 */
console.timeStamp('timestamp');


// Adds the profile 'MyLabel' to the Profiles panel of the inspector.
console.profileEnd('MyLabel');
