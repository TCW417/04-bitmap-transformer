'use strict';

const Bitmap = require('./model/bitmap');
const Args = require('./lib/parseArgs');
const file = require('./lib/fileOps');
const trans = require('./lib/transforms');

// validate arguments. Is input file found, does output file exist, is transformation valid?
const args = new Args(process.argv);
console.log(args);

if (args.validInputs()) {
  console.log('args good. do transform');
}

// good input file at this point. Read and validate it.

const validateFileAttribs = (data) => {
  console.log('returned from readBmp');
  const bmp = new Bitmap(data);
  console.log(bmp);
  if (bmp.bitsPerPixel !== 24) {
    console.log('ERROR: Image file not 24bit color depth.');
  }
  // bmp at this point is something we can work with
  trans.doTransform(args.transform, bmp);

  file.writeBmp(args.outputFile, bmp, (err) => {
    console.log('ERROR: Unable to write output file');
    // throw err;
  });
  console.log('Success!');
};

// read input bmp file
file.readBmp(args.inputFile, validateFileAttribs);
