const { Transform } = require('stream');

const MAP = {
  i: '1',
  I: '1_',
  e: '€',
  E: '€_',
  o: '0',
  O: '0_',
  A: '4',
  b: '6',
  B: '8',
  l: '|',
  L: '|_',
  g: '9',
  s: '5',
  S: '5_',
  c: '[',
  C: '[_',
  z: '2',
  Z: '2_',
};

const encoder = new Transform({
  transform(chunk, encoding, cb) {
    const result = String(chunk).split('').map((letter) => MAP[letter] || letter).join('');
    this.push(result);
    cb();
  },
});

// # Piping
process.stdin
  .pipe(encoder)
  .pipe(process.stdout);


// # Events
// process.stdin.on('data', (data) => {
//   encoder.push(data);
// });

// encoder.on('data', (data) => {
//   const result = String(data).split('').map((letter) => MAP[letter] || letter).join('');
//   process.stdout.write(result);
// });
