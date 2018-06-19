'use strict';

const trans = module.exports = {};

trans.validTransforms = ['addBorder', 'flipH', 'flipV', 
  'hMirror', 'addRed', 'invert', 'grayscale'];
// don't publish hidden transforms in help text
trans.validLength = trans.validTransforms.length - 0; 

trans.addRed = (bitmap) => {
  const ct = bitmap.pixelArray;
  for (let row = 0; row < ct.length; row++) {
    for (let col = 0; col < ct[row].length; col++) {
      ct[row][col].red = 255;
    }
  }
};

trans.addBorder = (bitmap) => {
  const ct = bitmap.pixelArray;
  // top row of 5 pixels to black
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < ct[row].length; col++) {
      ct[row][col] = { blue: 0, green: 0, red: 255 };
    }
  }
  // bottom row of 5 pixels...
  for (let row = bitmap.height - 5; row < bitmap.height; row++) {
    for (let col = 0; col < ct[row].length; col++) {
      ct[row][col] = { blue: 0, green: 0, red: 255 };
    }
  }
  // left
  for (let row = 0; row < bitmap.height; row++) {
    for (let col = 0; col < 5; col++) {
      ct[row][col] = { blue: 0, green: 0, red: 255 };
    }
  }
  // right
  for (let row = 0; row < bitmap.height; row++) {
    for (let col = bitmap.width - 5; col < bitmap.width; col++) {
      ct[row][col] = { blue: 0, green: 0, red: 255 };
    }
  }
};
trans.flipH = (bitmap) => {
  // reverse the pixel array along the horizontal axis
  const ct = bitmap.pixelArray;
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

trans.flipV = (bitmap) => {
  // reverse the pixel array along the horizontal axis POORLY ;-)
  const ct = bitmap.pixelArray;
  const vLine = Math.floor(bitmap.width / 2);
  let temp;
  for (let row = 0; row < bitmap.height - 1; row++) {
    for (let col = 0, colC = bitmap.width - 1; col < vLine; col += 1, colC -= 1) {
      temp = ct[row][col];
      ct[row][col] = ct[row][colC];
      ct[row][colC] = temp;
    }
  }
};

trans.hMirror = (bitmap) => {
  // mirror the pixel array along the horizontal axis
  const ct = bitmap.pixelArray;
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

// Grayscale
trans.grayScale = (bitmap) => {
  const colors = bitmap.pixelArray.map((rgba) => {
    const gray = Math.floor((rgba.blue + rgba.green + rgba.red) / 3);
    return { blue: gray, green: gray, red: gray };
  });
  bitmap.pixelArray = colors;
};

// INVERT COLORS
trans.invert = (bitmap) => {
  const colors = bitmap.pixelArray.map((rgba) => {
    return {
      blue: 255 - rgba.blue,
      green: 255 - rgba.green,
      red: 255 - rgba.red,
    };
  });
  bitmap.pixelArray = colors;
};

trans.doTransform = (transform, bitmap) => {
  switch (transform) {
    case 'addRed':
      trans.addRed(bitmap);
      break;
    case 'addBorder':
      trans.addBorder(bitmap);
      break;
    case 'flipH':
      trans.flipH(bitmap);
      break;
    case 'hMirror':
      trans.hMirror(bitmap);
      break;
    case 'flipV':
      trans.flipV(bitmap);
      break;
    case 'grayscale':
      trans.grayScale(bitmap);
      break;
    case 'invert':
      trans.invert(bitmap);
      break;
    default:
      console.log(`Sorry, transform ${transform} not yet implemented.`);
      break;
  }
};
