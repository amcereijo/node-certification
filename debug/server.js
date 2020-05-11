const express = require('express');

const app = express();
const debug = require('debug')('my-server');

const past = (age, gap) => `${gap} years ago you were ${Number(age) - gap}<br>`;
const future = (age, gap) => `In ${gap} years you will be ${Number(age) + gap}<br>`;

app.get('/:age/', (req, res) => {
  debug('calling my server');
  res.send(past(req.params.age, 10) + future(req.params.age, 10));
});

app.listen(3000);
