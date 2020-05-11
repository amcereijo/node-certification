const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const { Transform, Readable } = require('readable-stream');


// class MyTransform extends Transform {
//   _transform (chunk, enc, cb) {
//  // console.log('.');
//     process.stdout.write('.');
//     cb(null, chunk);  }
// }
// const processStream = new MyTransform();


const processStream = Transform({
  transform: (chunk, encoding, callback) => {
    // console.log('.');
    process.stdout.write('.');
    callback(null, chunk);
  },
});
const a = 'a';


fs.createReadStream('./zipped-encripted.gz')
  .pipe(crypto.createDecipher('aes192', 'passsword'))
  .pipe(processStream)
  .pipe(zlib.createUnzip())
  .pipe(fs.createWriteStream('./unzipped-encripted.txt'))
  .on('end', () => console.log('Done'));
