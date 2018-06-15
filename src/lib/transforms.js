'use strict';

const trans = module.exports = {};

trans.transformations = ['addRed', 'foo'];

let x = 50;

const addRed = (ct) => {
  // ct.forEach(ctRow => ctRow.map(pix => pix.red = 255)); 
  // for each element in bitmap's pixel array, set blue channel to 255
  for (let row = 0; row < ct.length; row++) {
    for (let col = 0; col < ct[row].length; col++) {
      ct[row][col].red = 243;
      if (x-- > 0) console.log(ct[row][col]);
    }
  }
};

trans.transFunctions = [addRed, null];

trans.doTransform = (transform, colorTable) => {
  console.log('doing transform');
  // console.log(JSON.stringify(colorTable, null, 2));
  switch (transform) {
    case 'addRed':
      addRed(colorTable);
      break;
    default:
      console.log('default transform');
      break;
  }

  console.log('after transform');
  // console.log(JSON.stringify(colorTable, null, 2));
};
