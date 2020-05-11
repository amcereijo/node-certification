const { expect } = require('chai');
const fs = require('fs');
const { watchFolder } = require('./watcher');

describe('watcher', () => {
  describe('watchFolder', () => {
    const folderToWatch = __dirname;
    const fileToAdd = 'fileToAdd.txt';
    let watcherListener;

    beforeAll(() => {
      watcherListener = watchFolder(folderToWatch);
    });

    it('should notifiy when a file is added with its name', (done) => {
      const listen = (filename) => {
        expect(filename).to.eql(fileToAdd);
        done();
      };

      watcherListener.once('change', listen);

      fs.writeFileSync(`${__dirname}/${fileToAdd}`, 'Content');
    });

    it('should notifiy when a file is edited', (done) => {
      const listen = (filename) => {
        expect(filename).to.eql(fileToAdd);
        done();
      };

      watcherListener.once('change', listen);

      fs.appendFileSync(`${__dirname}/${fileToAdd}`, 'More data');
    });

    it('should notify when a file is removed with its name', (done) => {
      const listen = (filename) => {
        expect(filename).to.eql(fileToAdd);
        done();
      };

      watcherListener.once('change', listen);

      fs.unlinkSync(`${__dirname}/${fileToAdd}`);
    });

    it('after call stop watching, should not receive events', async (done) => {
      watcherListener.emit('stop');

      // await listener receives "stop" event
      await new Promise((resolve) => setTimeout(() => resolve(), 500));

      watcherListener.once('change', () => { done(new Error()); });

      fs.writeFileSync(`${__dirname}/${fileToAdd}`, 'Content');
      fs.unlinkSync(`${__dirname}/${fileToAdd}`);

      setTimeout(done, 500);
    });
  });
});
