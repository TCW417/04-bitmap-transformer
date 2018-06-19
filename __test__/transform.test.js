'use strict';

const colors = { 
  pixelArray: [ 
    { red: 1, green: 2, blue: 3 }, 
    { red: 4, green: 5, blue: 6 }, 
    { red: 7, green: 8, blue: 9 }, 
  ], 
};

// const grayRGB = { pixelArray: [[1, 1, 1], [2, 2, 2], [3, 3, 3]] };
// const invertRGB = [249, 253, 253];

const trans = require('../src/lib/transforms');

describe('grayscale color test', () => {
  test('should provide an rgb array with values for gray output', () => {
    trans.grayScale(colors);
    expect(colors.pixelArray[1].blue).toEqual(5);
    expect(colors.pixelArray[2].red).toEqual(8);
  });
});

describe('invert color test', () => {
  test('should provide an rgb array with values for invert output', () => {
    trans.invert(colors);
    expect(colors.pixelArray[0].blue).toEqual(253);
    expect(colors.pixelArray[1].green).toEqual(250);
  });
});
