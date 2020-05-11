/*
want to perform some operations in parallel, but keep the number
of running I/O operations under a set limit
*/

function doAsyncTask(numericData, cb) {
  console.log(`to run doAsyncTask for ${numericData} - takes 1sec`);
  // run in random time
  setTimeout(() => cb(numericData * 2), Math.ceil(Math.random() * 1000));
}
const actions = [1, 2, 3, 4, 5];
const results = [];
const limit = 2;
let running = 0;
let position = 0;

function run(element) {
  if (element) {
    running += 1;
    const pos = position;

    doAsyncTask(element, (result) => {
      results[pos] = result;
      running -= 1;

      if (running < limit) {
        position += 1;
        run(actions.shift());
      }
    });

    if (running < limit) {
      position += 1;
      run(actions.shift());
    }
  } else if (!running && !actions.length) {
    console.log('End: ', results);
  }
}

run(actions.shift());


/* Other way */

/*
function buildRunWhileCallback(pos) {
  return (result) => {
    results[pos] = result;
    running -= 1;

    if (actions.length) {
      runWhile();
    } else if (running === 0) {
      console.log('End: ', results);
    }
  };
}
function runWhile() {
  while (actions.length && running < limit) {
    const pos = position;
    position += 1;
    const item = actions.shift();

    doAsyncTask(item, buildRunWhileCallback(pos));

    running += 1;
  }
}

runWhile();
*/
