/*
Transforma a CSV file in a json file with a list of objects. Example:
  a:b:c
  1:2:3
  4:5:6
to
  {
  data:
  [
  {a:1, b:2, c:3},
  {a:4, b:5, c:6},
  ]
  }

Steps:
* read csv file
* create object properties
* fill list of element with object properties + object values
* print data in file
*/
const fs = require('fs');
const { Transform, Writable } = require('readable-stream'); // better than just require('streams')

let HEADERS;
const readableFileStream = fs.createReadStream(`${__dirname}/example.csv`);
const writableFileStream = fs.createWriteStream(`${__dirname}/result.json`);
writableFileStream.write('{\n"data": [\n');

const breakLineTransformer = new Transform({
  transform(chunk, enconding, cb) {
    chunk.toString().split('\n').forEach((line) => this.push(line));
    cb();
  },
});

function buildObjectData(values) {
  return HEADERS.reduce((acc, header, pos) => ({ ...acc, [header]: values[pos] }), {});
}

const buildDataStream = new Transform({
  transform(chunk, enconding, cb) {
    if (!HEADERS) {
      HEADERS = chunk.toString().split(':');
    } else {
      const objectData = buildObjectData(chunk.toString().split(':'));
      this.push(JSON.stringify(objectData));
    }
    cb();
  },
});

const printerStream = new Writable({
  write(chunk, enconding, cb) {
    console.log('=> ', chunk.toString());
    writableFileStream.write(`${chunk.toString()},\n`);
    cb();
  },
  final(cb) {
    writableFileStream.write(']\n}');
    writableFileStream.end();
    cb();
  },
});

readableFileStream
  .pipe(breakLineTransformer)
  .pipe(buildDataStream)
  .pipe(printerStream);
