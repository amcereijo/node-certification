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

actions.forEach((item) => {
  doAsyncTask(item, (result) => {
    results.push(result);

    if (results.length === actions.length) {
      console.log('End not ordered result: ', results);
    }
  });
});
