'use strict';

// validate arguments. Is input file found, does output file exist, is transformation valid?
const Args = require('./lib/parseArgs');

const args = new Args(process.argv);
console.log(args);

if (args.validInputs()) {
  console.log('args good. do transform');
}
