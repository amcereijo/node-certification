const interval = setInterval(() => {
  console.log('interval...');
}, 100);

console.log('init');
for (let i = 0; i < 9000000000; i += 1) { /* */ }
console.log('end');
clearInterval(interval);
