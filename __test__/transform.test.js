'use strict';
const colors = [[1,1,1,],[2,2,2],[3,3,3]];
const grayRGB = [[1,1,1,],[2,2,2],[3,3,3]];
const invertRGB = [249,253,253];

let grayScale = require('./../src/lib/transform.js').trans.validTransforms[4];

let invert = require('./../src/lib/transform.js').trans.validTransforms[5];

describe('grayscale color test', () => {
  test('should provide an rgb array with values for gray output', () => {
    expect(grayScale(colors).toEqual(grayRGB));
  });
});

describe('invert color test', () => {
  test('should provide an rgb array with values for invert output', () => {
    expect(invert(colors).toEqual(invertRGB));
  });
});