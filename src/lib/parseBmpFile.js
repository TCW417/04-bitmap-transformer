'use strict';

const fs = require('fs');

const Bitmap = require('../model/bitmap');

const fd = `${__dirname}/../../${process.argv[2]}`;

const data = fs.readFileSync(fd);

const bmp = new Bitmap(data);

// console.log(data.slice(0,100));
console.log(bmp);
const colorTable = bmp.colorTable();
console.log('color table size', colorTable.length, 'by', colorTable[0].length);
// console.log('row 1', colorTable[1].length);
// console.log('row 2', colorTable[2].length);
// console.log(colorTable[0]);

