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


function run(element) {
  if (element) {
    running += 1;

    doAsyncTask(element, (result) => {
      results.push(result);
      running -= 1;

      if (running < limit) {
        run(actions.shift());
      }
    });

    if (running < limit) {
      run(actions.shift());
    }
  } else if (!running && !actions.length) {
    console.log('End: ', results);
  }
}

run(actions.shift());

/* Other way */
/*
function runWhileCallback(result) {
  results.push(result);
  running -= 1;

  if (actions.length) {
    runWhile();
  } else if (running === 0) {
    console.log('End: ', results);
  }
}
function runWhile() {
  while (actions.length && running < limit) {
    const item = actions.shift();

    doAsyncTask(item, runWhileCallback);

    running += 1;
  }
}

runWhile();
*/
