/*
# Your Mission

Starting with your solution from the previous lesson, assign a value to the global variable
quux inside foo() (don't use var or let). Create a shadow variable in of quux
inside zip(). The value in the global variable quux has to be different than the
value of quux inside zip().

Once complete, execute @workshoppers/scope-chains-closures verify <your-file.js> to verify your
solution.
*/
function foo() {
  let bar;
  quux = 'quux';

  function zip() {
    const quux = 'other';
  }
}
