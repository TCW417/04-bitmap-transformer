'use strict';

const fs = require('fs');

const Bitmap = require('../model/bitmap');

const fd = `${__dirname}/../../${process.argv[2]}`;

const data = fs.readFileSync(fd);

const bmp = new Bitmap(data);

// console.log(data.slice(0,100));
console.log(bmp);
const colorTable = bmp.colorTable();
console.log('color table size', colorTable.length, colorTable[0].length);
console.log(colorTable[0]);

