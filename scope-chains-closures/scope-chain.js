/*
# Your Mission

Modify your solution from lesson 1 so foo, in addition to lexically scoped variable bar,
contains a function zip
which itself contains one variable lexically scoped called quux

Once complete, execute @workshoppers/scope-chains-closures verify <your-file.js> to verify your
solution.
*/

function foo() {
  let bar;

  function zip() {
    let quux;
  }
}
