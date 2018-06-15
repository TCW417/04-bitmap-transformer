'use strict';

const trans = module.exports = {};

const addRed = (bitmap) => {
  const ct = bitmap.colorTable;
  for (let row = 0; row < ct.length; row++) {
    for (let col = 0; col < ct[row].length; col++) {
      ct[row][col].red = 255;
    }
  }
};

trans.doTransform = (transform, bitmap) => {
  switch (transform) {
    case 'addRed':
      addRed(bitmap);
      break;
    default:
      console.log(`Sorry, transform ${transform} not yet implemented.`);
      break;
  }
};
