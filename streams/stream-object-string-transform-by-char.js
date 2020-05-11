/*
 This is an example sentence. Is all ok?\n

 {
   wordsCount: 8,
   words: ['This', 'is', 'an', 'example', sentence', 'Is', 'all', 'ok'],
   repitedWords: true,
   symbolsCount: 2,
   symbols: ['.', '?'],
   repitedSymbols: false,
 }
*/
const { Transform, Duplex } = require('stream');

const SYMBOLS = ['.', ',', '?', '¡', '¿', '!', ':', ';'];
function isSymbol(char) {
  return SYMBOLS.includes(char);
}

const splitChars = new Transform({
  transform(chunk, encoding, cb) {
    String(chunk).split('').forEach((char) => this.push(char));
    cb();
  },
});

const splitText = new Transform({
  writableObjectMode: false,
  readableObjectMode: false,

  transform(chunk, encoding, cb) {
    if (!this.temp) {
      this.temp = [];
    }

    const stringChunk = String(chunk);

    if ((stringChunk.match(/\n/) || stringChunk === ' ' || isSymbol(stringChunk)) && this.temp.length) {
      this.push(this.temp.join('').toLowerCase().trim());
      this.temp = [];
    }

    if (isSymbol(stringChunk) || stringChunk.match(/\n/)) {
      this.push(stringChunk);
    } else if (stringChunk !== ' ') {
      this.temp.push(stringChunk);
    }

    cb();
  },
});

const createObjectData = new Duplex({
  writableObjectMode: true,
  readableObjectMode: true,

  read() {},
  write(chunk, enconding, cb) {
    if (!this.data) {
      this.data = {
        symbols: [],
        words: [],
      };
    }
    const stringChunk = String(chunk);

    if (stringChunk.match(/\n/)) {
      this.push(this.data);
      this.data = null;
    } else if (isSymbol(stringChunk)) {
      this.data.symbols.push(stringChunk);
    } else {
      this.data.words.push(stringChunk);
    }

    cb();
  },

});

const countElements = new Transform({
  objectMode: true,

  transform(chunk, encoding, cb) {
    const { words, symbols } = chunk;

    this.push({
      words,
      symbols,
      wordsCount: words.length,
      symbolsCount: symbols.length,
    });

    cb();
  },
});

const repitedElements = new Transform({
  objectMode: true,

  transform(chunk, encoding, cb) {
    const { words, symbols } = chunk;
    const repitedWords = words.length - new Set(words).size;
    const repitedSymbols = symbols.length - new Set(symbols).size;

    this.push({ ...chunk, repitedWords, repitedSymbols });

    cb();
  },
});

const toString = new Transform({
  readableObjectMode: false,
  writableObjectMode: true,

  transform(chunk, encoding, cb) {
    if (chunk === null) {
      this.push(null);
    }
    this.push(JSON.stringify(chunk, null, 2));
    cb();
  },
});

process.stdin
  .pipe(splitChars)
  .pipe(splitText)
  .pipe(createObjectData)
  .pipe(countElements)
  .pipe(repitedElements)
  .pipe(toString)
  .pipe(process.stdout);
