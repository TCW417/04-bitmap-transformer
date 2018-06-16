'use strict';

const trans = module.exports = {};

trans.validTransforms = ['addRed', 'addBorder', 'flipH', 'saggyButt'];

const addRed = (bitmap) => {
  const ct = bitmap.colorTable;
  for (let row = 0; row < ct.length; row++) {
    for (let col = 0; col < ct[row].length; col++) {
      ct[row][col].red = 255;
    }
  }
};

const addBorder = (bitmap) => {
  const ct = bitmap.colorTable;
  // top row of 5 pixels to black
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < ct[row].length; col++) {
      ct[row][col] = { blue: 0, green: 0, red: 0 };
    }
  }
  // bottom row of 5 pixels...
  for (let row = bitmap.height - 5; row < bitmap.height; row++) {
    for (let col = 0; col < ct[row].length; col++) {
      ct[row][col] = { blue: 0, green: 0, red: 0 };
    }
  }
  // left
  for (let row = 0; row < bitmap.height; row++) {
    for (let col = 0; col < 5; col++) {
      ct[row][col] = { blue: 0, green: 0, red: 0 };
    }
  }
  // right
  for (let row = 0; row < bitmap.height; row++) {
    for (let col = bitmap.width - 5; col < bitmap.width; col++) {
      ct[row][col] = { blue: 0, green: 0, red: 0 };
    }
  }
};

const flipH = (bitmap) => {
  // reverse the pixel array along the horizontal axis
  const ct = bitmap.colorTable;
  const hLine = Math.floor(bitmap.height / 2);
  let temp;
  for (let col = 0; col < bitmap.width - 1; col++) {
    for (let row = 0, rowR = bitmap.height - 1; row < hLine; row += 1, rowR -= 1) {
      temp = ct[row][col];
      ct[row][col] = ct[rowR][col];
      ct[rowR][col] = temp;
    }
  }
};

const saggyButt = (bitmap) => {
  // reverse the pixel array along the horizontal axis POORLY ;-)
  const ct = bitmap.colorTable;
  const hLine = Math.floor(bitmap.height / 2);
  let temp;
  for (let col = 0; col < bitmap.width - 1; col++) {
    for (let row = 0, rowR = bitmap.height - 1; row < hLine; row += 1, rowR -= 1) {
      temp = ct[row][col];
      ct[rowR][col] = ct[row][col];
      ct[rowR][col] = temp;
    }
  }
};

trans.doTransform = (transform, bitmap) => {
  switch (transform) {
    case 'addRed':
      addRed(bitmap);
      break;
    case 'addBorder':
      addBorder(bitmap);
      break;
    case 'flipH':
      flipH(bitmap);
      break;
    case 'saggyButt':
      saggyButt(bitmap);
      break;
    default:
      console.log(`Sorry, transform ${transform} not yet implemented.`);
      break;
  }
};
