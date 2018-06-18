'use strict';

const fs = require('fs');
const t = require('./transforms');

const getInvokePath = (cmdPath) => {
  return cmdPath.slice(0, cmdPath.lastIndexOf('/'));
};

module.exports = class Args {
  constructor(argv) {
    Object.assign(
      this,   
      { 
        node: argv[0], 
        command: argv[1],
        inputFile: `${getInvokePath(argv[1])}/${argv[2]}`,
        outputFile: `${getInvokePath(argv[1])}/${argv[3]}`, 
        transform: argv[4],
      },
    );
  }

  validInputs() {
    if (Object.keys(this).length < 5) {
      console.log('ERROR: Missing arguments.\n    Usage: node index.js input.bmp output.bmp transform');
      return false;
    }
    if (!fs.existsSync(this.inputFile)) {
      console.log(`ERROR: Input file not found.\n    Path: ${this.inputFile}`);
      return false;
    }
    if (fs.existsSync(this.outputFile)) {
      console.log(`ERROR: Output file already exists.\n    Path ${this.outputFile}`);
      return false;
    }
    if (!t.validTransforms.includes(this.transform)) {
      console.log(`ERROR: Transform not recognized: ${this.transform}`);
      console.log(`    Valid transforms: ${t.validTransforms.slice(0, t.validLength).join(',')}`);
      return false;
    }
    return true;
  }
};
