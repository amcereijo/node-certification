/*

# Your Mission

Modify your solution from the previous lesson to set bar = true inside zip(),
then return the function zip as the result of foo()

Once complete, execute @workshoppers/scope-chains-closures verify <your-file.js> to verify your
solution.

*/
function foo() {
  let bar;
  quux = 'quux';

  function zip() {
    const quux = 'other';
    bar = true;
  }

  return zip;
}
