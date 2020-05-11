/*
 want to take a small set of operations, launch them all in parallel
 and then do something when all of them are complete
*/

function doAsyncTask(numericData, cb) {
  console.log(`to run doAsyncTask for ${numericData} - takes 1sec`);
  // run in random time
  setTimeout(() => cb(numericData * 2), Math.ceil(Math.random() * 1000));
}
const actions = [1, 2, 3, 4, 5];
const results = [];
let filled = actions.length;

actions.forEach((item, pos) => {
  doAsyncTask(item, (result) => {
    results[pos] = result;
    filled -= 1;

    if (!filled) {
      console.log('End ordered result: ', results);
    }
  });
});
