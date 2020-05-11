// this will not work as module.exports does becauses exports === module.exports (true)
console.log('\nNow this exports === module.export is', (exports === module.exports));
exports = {
  thisWillNotExists: true,
};
console.log('Now this exports === module.export is', (exports === module.exports), '\n');
