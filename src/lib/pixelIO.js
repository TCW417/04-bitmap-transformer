'use strict';

const pixelRows = module.exports = {};

pixelRows.get24bitPixelRow = (rowOfBytes) => {
  const pixelRow = [];
  const pixelsPerRow = Math.floor(rowOfBytes.length / 3);
  for (let pixel = 0; pixel < pixelsPerRow; pixel++) {
    const offset = pixel * 3;
    const pixelVal = {
      blue: rowOfBytes.readUInt8(offset + 0),
      green: rowOfBytes.readUInt8(offset + 1),
      red: rowOfBytes.readUInt8(offset + 2),
    };
    pixelRow.push(pixelVal);
  }
  return pixelRow;
};

pixelRows.write24bitPixelTable = (bitmap, buffer) => {
  const ct = bitmap.pixelArray;
  for (let row = 0; row < ct.length; row++) {
    const rowOffset = bitmap.pixelArrayLoc + (row * bitmap.rowSize);
    for (let col = 0; col < ct[row].length; col++) {
      const colOffset = rowOffset + (col * 3);
      buffer.writeUInt8(ct[row][col].blue, colOffset);
      buffer.writeUInt8(ct[row][col].green, colOffset + 1);
      buffer.writeUInt8(ct[row][col].red, colOffset + 2);
    }
    for (let p = 0; p < bitmap.rowPadding; p++) {
      buffer.writeUInt8(0, ct[row].length + p);
    }
  }
};
