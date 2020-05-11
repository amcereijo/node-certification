const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const { Transform, Readable } = require('readable-stream');

const processStream = new Transform({
  transform(chunk, encoding, callback) {
    // console.log('.');
    process.stdout.write('.');
    callback(null, chunk);
  },
});

const message = `
Hello There!
How are you?

See you next time!
`;
new Readable({
  read(size) {
    this.index = this.index || 0;
    // const top = size || 10;
    const data = message.substring(this.index, this.index + 10) || null;
    console.log(`Read from ${this.index} to ${this.index + 10} - ${data}`);
    this.push(data);
    this.index += 10;
  },
})
// fs.createReadStream(__filename)
  .pipe(zlib.createGzip())
  .pipe(processStream)
  .pipe(crypto.createCipher('aes192', 'passsword'))
  .pipe(fs.createWriteStream('./zipped-encripted.gz'))
  .on('end', () => console.log('Done'));
