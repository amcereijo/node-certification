function SuperAritmetic() {

}

SuperAritmetic.prototype.subtract = function subtract() {};

function Aritmetic() {
  this.sum = function sum() {};
}

Aritmetic.prototype = Object.create(SuperAritmetic.prototype);
Aritmetic.prototype.plus = function plus() {};

module.exports = {
  Aritmetic,
};
