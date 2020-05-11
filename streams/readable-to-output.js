const { Readable } = require('readable-stream');

const inStream = new Readable({
  read(size) {
    console.log('\nread method:', size);
    this.currentCharCode += 1;
    this.push(String.fromCharCode(this.currentCharCode));

    if (this.currentCharCode > 90) {
      this.push(null);
    }
  },
});

inStream.currentCharCode = 65;

// choose "readable" or "data" event
// inStream.on('readable', function onReadable() {
//   let data = this.read();
//   while (data) {
//     console.log('---------------------------------');
//     console.log(String(data));
//     console.log('---------------------------------');
//     data = this.read();
//   }
// });

inStream.on('data', (chunk) => {
  console.log('---------------------------------');
  console.log(String(chunk));
  console.log('---------------------------------');
});


inStream.on('end', () => {
  console.log('Stream Closed...');
});

// inStream.pipe(process.stdout);
