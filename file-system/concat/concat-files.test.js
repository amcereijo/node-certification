const fs = require('fs');
const { expect } = require('chai');
const { concatFiles } = require('./concat-files');

describe('concat-files', () => {
  const content1 = 'File1.text content\n';
  const content2 = 'File2.text content\n';

  beforeAll(async () => {
    await fs.promises.writeFile('./file1.txt', content1);
    await fs.promises.writeFile('./file2.txt', content2);

    await concatFiles(['./file1.txt', './file2.txt'], './dest.txt');
  });
  afterAll(async () => {
    await fs.promises.unlink('./file1.txt');
    await fs.promises.unlink('./file2.txt');
    await fs.promises.unlink('./dest.txt');
  });

  it('should concat two files content', async () => {
    const content = await fs.promises.readFile('./dest.txt');

    expect(content.includes(content1)).to.eql(true);
    expect(content.includes(content2)).to.eql(true);
  });
});
