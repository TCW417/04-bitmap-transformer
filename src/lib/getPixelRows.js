'use strict';

const pixelRows = module.exports = {};

pixelRows.get32bitPixelRow = (rowOfBytes) => {
  const pixelRow = [];
  const rowLength = rowOfBytes.length / 4;
  for (let pixel = 0; pixel < rowLength; pixel += 4) {
    pixelRow.push(rowOfBytes.readUInt32LE(pixel));
  }
  return pixelRow;
};
