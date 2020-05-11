/*
 This is an example sentence. Is all ok?

 {
   wordsCount: 8,
   words: ['This', 'is', 'an', 'example', sentence', 'Is', 'all', 'ok'],
   repitedWords: true,
   symbolsCount: 2,
   symbols: ['.', '?'],
   repitedSymbols: false,
 }
*/
const { Transform } = require('stream');

const SYMBOLS = ['.', ',', '?', '¡', '¿', '!', ':', ';'];
function isSymbol(char) {
  return SYMBOLS.includes(char);
}


function createList(chunk) {
  const listOfElements = [];
  let temp = [];
  String(chunk).split('').forEach((character) => {
    if ((character === ' ' || isSymbol(character)) && temp.length) {
      listOfElements.push(temp.join('').toLowerCase().trim());
      temp = [];
    }

    if (isSymbol(character)) {
      listOfElements.push(character);
    } else {
      temp.push(character);
    }
  });
  return listOfElements;
}

const splitText = new Transform({
  writableObjectMode: false,
  readableObjectMode: true,

  transform(chunk, encoding, cb) {
    const listOfElements = createList(chunk);

    const words = listOfElements.filter((element) => !isSymbol(element));
    const symbols = listOfElements.filter((element) => isSymbol(element));

    this.push({
      words,
      symbols,
    });

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
    this.push(JSON.stringify(chunk, null, 2));
    cb();
  },
});

process.stdin
  .pipe(splitText)
  .pipe(countElements)
  .pipe(repitedElements)
  .pipe(toString)
  .pipe(process.stdout);
