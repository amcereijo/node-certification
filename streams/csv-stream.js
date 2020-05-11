const csv = require('csv');
const fs = require('fs');
const { Writable } = require('readable-stream');

const csvParser = csv.parse({
  delimiter: ':',
});

const write = new Writable({
  objectMode: true,
  write(chunk, enc, cb) {
    console.log('chunk', chunk);
    cb();
  },
});

fs.createReadStream(`${__dirname}/csv.csv`, { encoding: 'utf8' })
  .pipe(csvParser)
  .pipe(write);
