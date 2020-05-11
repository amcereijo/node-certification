/*
Your program will get some html written to stdin. Convert all the inner html to
upper-case for elements with a class name of "loud",
and pipe all the html to stdout.

You can use `trumpet` and `through2` to solve this adventure.

With `trumpet` you can create a transform stream from a css selector:

    var trumpet = require('trumpet');
    var fs = require('fs');
    var tr = trumpet();
    fs.createReadStream('input.html').pipe(tr);

    var stream = tr.select('.beep').createStream();

Now `stream` outputs all the inner html content at `'.beep'` and the data you
write to `stream` will appear as the new inner html content.

Make sure to `npm install trumpet through2` in the directory where your solution
file lives.
*/

const trumpet = require('trumpet');
const Through2 = require('through2');

function write(buffer, encoding, next) {
  const upperData = new String(buffer).toUpperCase();
  this.push(new Buffer(upperData));
  next();
}
function end(done) {
  done();
}
const toUpperCaseTransform = new Through2(write, end);
const tr = trumpet();

const htmlStream = tr.selectAll('.loud').createStream();

htmlStream
  .pipe(toUpperCaseTransform)
  .pipe(htmlStream);

process.stdin
  .pipe(tr)
  .pipe(process.stdout);


// 2 solution
/*
tr.selectAll('.loud', (data) => {
  const stream = data.createStream();

  stream
    .pipe(toUpperCaseTransform)
    .pipe(stream);
});

process.stdin
  .pipe(tr)
  .pipe(process.stdout);
*/
