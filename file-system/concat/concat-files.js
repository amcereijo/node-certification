const contactFilesModule = require('concat-files');

function concatFiles(files, destFile) {
  return new Promise((resolve, reject) => {
    contactFilesModule(files, destFile, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

module.exports = { concatFiles };
