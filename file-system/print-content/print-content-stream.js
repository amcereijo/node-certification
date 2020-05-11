const fs = require('fs');

async function read(file, resolve, reject) {
  const stat = await fs.promises.stat(file);
  const buffer = Buffer.alloc(stat.size);
  let length = 0;

  fs.createReadStream(file, { highWaterMark: 5 })
    .on('data', (chunk) => {
      buffer.write(chunk.toString(), length);
      length += chunk.length;
      // could write to any place when length is too high
    })
    .on('end', () => {
      resolve(buffer.toString('utf8'));
    })
    .on('error', (err) => {
      reject(err);
    });
}
function executeNext(file) {
  return new Promise((resolve, reject) => {
    read(file, resolve, reject);
  });
}

/*
 Receive 3 files and print its content ordered.
 All filereaders shoul be initializated at the same time.
 Printing should be in order
*/
function printNextTick(file1, file2, file3) {
  return new Promise((resolve) => {
    process.nextTick(() => Promise.all([
      executeNext(file1),
      executeNext(file2),
      executeNext(file3),
    ])
      .then(([data1, data2, data3]) => {
        console.log(data1);
        console.log(data2);
        console.log(data3);
        resolve();
      }));
  });
}

function print(file1, file2, file3) {
  return Promise.all([
    executeNext(file1),
    executeNext(file2),
    executeNext(file3),
  ])
    .then(([data1, data2, data3]) => {
      console.log(data1);
      console.log(data2);
      console.log(data3);
    });
}

module.exports = { printNextTick, print };
