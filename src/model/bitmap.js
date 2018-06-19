'use strict';

const pr = require('../lib/pixelIO');

const Bitmap = module.exports = class { /* eslint-disable-line */
  constructor(buffer) {
    const headerOffset = 0;
    const fileSizeOffset = 2;
    const pixelArrayLocOffset = 10;
    const bitmapWidthOffset = 18;
    const bitmapHeightOffset = 22;
    const colorPlanesOffset = 26;
    const bitsPerPixelOffset = 28;
    const compressionMethodOffset = 30;
    const rawBitmapDataSizeOffset = 34;
    const bitmapInfoHeaderSizeOffset = 14;

    this.header = buffer.toString('ascii', headerOffset, 2);
    if (this.header !== 'BM') throw new Error(`Unrecognized header typedf ${this.header}.`);

    this.fileSize = buffer.readUInt32LE(fileSizeOffset);
    this.pixelArrayLoc = buffer.readUInt32LE(pixelArrayLocOffset);
    this.height = buffer.readUInt16LE(bitmapHeightOffset);
    this.width = buffer.readUInt16LE(bitmapWidthOffset);
    this.colorPlanes = buffer.readUInt16LE(colorPlanesOffset);
    this.bitsPerPixel = buffer.readUInt16LE(bitsPerPixelOffset);
    this.rowSize = Math.floor(((this.bitsPerPixel * this.width) + 31) / 32) * 4;
    this.pixelArraySize = this.rowSize * Math.abs(this.height);
    this.compressionMethod = buffer.readUInt32LE(compressionMethodOffset);
    this.rawBitmapDataSize = buffer.readUInt32LE(rawBitmapDataSizeOffset);
    this.bitmapInfoHeaderSize = buffer.readUInt32LE(bitmapInfoHeaderSizeOffset);
    this.rowPadding = this.rowSize - (this.width * (this.bitsPerPixel / 8));

    const buildPixelArray = () => {
      const pixelArray = [];
      const numRows = this.height;
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
        const sliceStart = this.pixelArrayLoc + (row * this.rowSize) + (row * this.rowPadding);
        const sliceEnd = sliceStart + this.rowSize;
        pixelArray[row] = getPixelRow(buffer.slice(sliceStart, sliceEnd));
      }
      return pixelArray;
    };

    this.pixelArray = buildPixelArray();
  }

  // possible methods
  // greyscale()
  // invertColors()
  // fillWithBlack/Red/Green/etc
  // flipImage()
  // addBorder()
};
