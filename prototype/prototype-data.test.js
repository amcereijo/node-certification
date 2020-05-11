const { expect } = require('chai');
const { Aritmetic } = require('./prototype-data');

describe('prototype-data', () => {
  describe('calling new should create an object', () => {
    const aritmetic = new Aritmetic();

    it('with own "sum" method', () => {
      const isOwnProperty = Object.prototype.hasOwnProperty.call(aritmetic, 'sum');
      expect(isOwnProperty).to.eql(true);
      expect(aritmetic.sum).to.be.a('function');
    });

    it('with from parent "subtract" method', () => {
      const isOwnProperty = Object.prototype.hasOwnProperty.call(aritmetic, 'subtract');
      expect(isOwnProperty).to.eql(false);
      expect(aritmetic.subtract).to.be.a('function');
    });

    it('with not own "plus" method', () => {
      const isOwnProperty = Object.prototype.hasOwnProperty.call(aritmetic, 'plus');
      expect(isOwnProperty).to.eql(false);
      expect(aritmetic.plus).to.be.a('function');
    });
  });
});
