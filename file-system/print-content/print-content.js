const fs = require('fs');

function executeNext(file) {
  return fs.promises.readFile(file)
    .then((data) => data.toString('utf8'));
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
