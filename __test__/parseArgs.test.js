'use strict';

const ps = require('../src/lib/parseArgs');

describe('parseArgs function tests', () => {
  test('Pass in 2 arguments (argv length 4)', () => {
    expect(ps.parseArgs([0, 1, 'arg1', 'arg2'])).toEqual(['arg1', 'arg2']);
  });
});




