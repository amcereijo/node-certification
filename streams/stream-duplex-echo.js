const { Duplex } = require('stream');

const duplex = new Duplex({
  read(/* size */) {
    if (this.charCode < 90) {
      this.push(String.fromCharCode(this.charCode));
      this.charCode += 1;
    } else {
      this.push(null);
    }
  },

  write(chunk, enconding, cb) {
    console.log('Chunk=> ', String(chunk));
    setTimeout(cb, 500);
  },
});


duplex.charCode = 45;

duplex.pipe(duplex);
// To pipe input from console
// process.stdin.pipe(duplex).pipe(process.stdout);
