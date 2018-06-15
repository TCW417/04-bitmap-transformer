'use strict';

const Bitmap = require('./model/bitmap');
const Args = require('./lib/parseArgs');
const file = require('./lib/fileOps');

// validate arguments. Is input file found, does output file exist, is transformation valid?
const args = new Args(process.argv);
console.log(args);

if (args.validInputs()) {
  console.log('args good. do transform');
}

// good input file at this point. Read and validate it.

const validateFileAttribs = (data) => {
  console.log('returned from readBmp');
  const inputBmp = new Bitmap(data);
  console.log(inputBmp);
  if (inputBmp.bitsPerPixel !== 24) {
    console.log('ERROR: Image file not 24bit color depth.');
  }
  
};

file.readBmp(args.inputFile, validateFileAttribs);
