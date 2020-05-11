// create an buffer with a delimtter size. Fille with 0 by defautl
const buffer = Buffer.alloc(128);

function print() {
  console.log(buffer);
  console.log(buffer.length);
  console.log(String(buffer));
}

function printContent() {
  // print all
  // buffer.forEach((value, pos) => {
  //   console.log(`${pos}: ${String.fromCharCode(value)}`);
  // });

  // print filled values (not nullish)
  buffer
    .filter((value) => !!value)
    .forEach((value, pos) => {
      console.log(`${pos}: "${String.fromCharCode(value)}"`);
    });
}

print();
printContent();

buffer.write('hello');
buffer.write(' there', 5);
print();
printContent();

// fille the buffer size with...
buffer.fill('1');
print();
printContent();
