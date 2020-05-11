const { exec } = require('child_process');

exec('find . -type f | wc -f', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error ${err} => ${stderr}`);
    return;
  }

  console.log(`Number of lines ${stdout}`);
});
