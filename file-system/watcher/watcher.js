const fs = require('fs');
const { EventEmitter } = require('events');

function watchFolder(folderName) {
  const eventEmiter = new EventEmitter();

  const watcher = fs.watch(folderName, (event, filename) => {
    eventEmiter.emit('change', filename);
  });

  eventEmiter.on('stop', () => {
    watcher.close();
  });

  return eventEmiter;
}

exports.watchFolder = watchFolder;
