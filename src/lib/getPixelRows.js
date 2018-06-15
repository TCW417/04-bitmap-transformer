'use strict';

const pixelRows = module.exports = {};
let x = 5;
pixelRows.get8bitPixelRow = (rowOfBytes) => {

  // if (x-- > 0) console.log('get 8 buffer len', rowOfBytes.length); /* eslint-disable-line */
  const pixelRow = [];
  const rowLength = rowOfBytes.length;
  for (let pixel = 0; pixel < rowLength; pixel += 1) {
    pixelRow.push(0 + rowOfBytes.readUInt8(pixel));
  }
  return pixelRow;
};

pixelRows.get16bitPixelRow = (rowOfBytes) => {
  const pixelRow = [];
  const rowLength = rowOfBytes.length / 2;
  for (let pixel = 0; pixel < rowLength; pixel += 2) {
    pixelRow.push(0 + rowOfBytes.readUInt16LE(pixel));
  }
  return pixelRow;
};

pixelRows.get24bitPixelRow = (rowOfBytes) => {
  const pixelRow = [];
  const pixelsPerRow = Math.floor(rowOfBytes.length / 3);
  if (x-- > 0) console.log('get 24 buffer len', rowOfBytes.length, 'pixelsPerRow', pixelsPerRow); 
  for (let pixel = 0; pixel < pixelsPerRow; pixel++) {
    const offset = pixel * 3;
    const pixelVal = {
      red: rowOfBytes.readUInt8(offset + 0),
      green: rowOfBytes.readUInt8(offset + 1),
      blue: rowOfBytes.readUInt8(offset + 2),
    };
    pixelRow.push(pixelVal);
  }
  return pixelRow;
};

pixelRows.get32bitPixelRow = (rowOfBytes) => {
  // if (x-- > 0) console.log('get 32 buffer len', rowOfBytes.length); /* eslint-disable-line */

  const pixelRow = [];
  const pixelsPerRow = rowOfBytes.length / 4;
  for (let pixel = 0; pixel < pixelsPerRow; pixel++) {
    pixelRow.push(rowOfBytes.readUInt32LE(pixel * 4));
  }
  return pixelRow;
};
