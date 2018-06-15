'use strict';

const pr = require('../lib/getPixelRows');

// size of file bitmap header = 14 bytes
// size of DIB header = 12 bytes

const Bitmap = module.exports = class {
  constructor(buffer) {
    // console.log('in constructor', buffer);
    const headerOffset = 0;
    const fileSizeOffset = 2;
    const pixelArrayLocOffset = 10;
    const bitmapWidthOffset = 18;
    const bitmapHeightOffset = 22;
    const colorPlanesOffset = 26;
    const bitsPerPixelOffset = 28;
    // TODO: find which decimal number the colorTableOffset starts at
    // const colorTableOffset;

    this.header = buffer.toString('ascii', headerOffset, 2);
    this.fileSize = buffer.readUInt32LE(fileSizeOffset);
    this.pixelArrayLoc = buffer.readUInt32LE(pixelArrayLocOffset);
    this.height = buffer.readUInt16LE(bitmapHeightOffset);
    this.width = buffer.readUInt16LE(bitmapWidthOffset);
    this.colorPlanes = buffer.readUInt16LE(colorPlanesOffset);
    this.bitsPerPixel = buffer.readUInt16LE(bitsPerPixelOffset);
    this.rowSize = Math.floor(((this.bitsPerPixel * this.width) + 31) / 32) * 4;
    this.pixelArraySize = this.rowSize * Math.abs(this.height);
    // this.colorTable = buffer.slice(this.pixelArrayLoc, 100);
    this.colorTable = () => {
      const pixelArray = [];
      const rowLength = this.rowSize; 
      const numRows = this.height;
      let pixelOffset = this.pixelArrayLoc;
      let getPixelRow;

      switch (this.bitsPerPixel) {
        case 8: 
          getPixelRow = pr.get8bitPixelRow;
          break;
        case 16:
          getPixelRow = pr.get16bitPixelRow;
          break;
        case 24:
          getPixelRow = pr.get24bitPixelRow;
          break;
        default:
          getPixelRow = pr.get32bitPixelRow;
      } 

      for (let row = 0; row < numRows; row++) {
        pixelArray[row] = getPixelRow(buffer.slice(row * rowLength, rowLength));
      }
      return pixelArray;
    };
    // this.colorTable = some method from the Buffer class that passes in the colorTableOffset variable and the colorTableLength so you can just access that portion of the buffer at that offset and manipulate that data 
  }

  // possible methods
  // greyscale()
  // invertColors()
  // fillWithBlack/Red/Green/etc
  // flipImage()
  // addBorder()
};
