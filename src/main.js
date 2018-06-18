'use strict';

const Bitmap = require('./model/bitmap');
const Args = require('./lib/parseArgs');
const file = require('./lib/fileOps');
const trans = require('./lib/transforms');
const pio = require('./lib/pixelIO');

// validate arguments. Is input file found, does output file exist, is transformation valid?
const args = new Args(process.argv);

// good input file at this point. Read and validate it.

const validateFileAttribs = (data) => {
  const bmp = new Bitmap(data);
  if (bmp.bitsPerPixel !== 24) {
    console.log('ERROR: Image file not 24bit color depth.');
  } else {
    // bmp at this point is something we can work with
    trans.doTransform(args.transform, bmp);

    pio.write24bitPixelTable(bmp, data); // set object and data buffer (binar) to write routine.

    file.writeBmp(args.outputFile, data);
  
    console.log('Success!');
  }
};

const init = () => {
  if (args.validInputs()) {
    // read input bmp file
    file.readBmp(args.inputFile, validateFileAttribs);  
  }
};

init();
