/*
we need to do five actions, and each of those actions needs data from
the previous one, so we have to run one after another.
*/

function doAsyncTask(numericData, cb) {
  console.log(`to run doAsyncTask for ${numericData} - takes 1sec`);
  setTimeout(() => cb(numericData * 2), 1000);
}
const actions = [1, 2, 3, 4, 5];
const results = [];

function run(element) {
  if (element) {
    doAsyncTask(element, (result) => {
      results.push(result);
      run(actions.shift());
    });
  } else {
    console.log('End: ', results);
  }
}

run(actions.shift());
