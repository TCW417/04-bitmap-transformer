'use strict';

const Args = require('../src/lib/parseArgs');

describe('parseArgs function tests', () => {
  const argv = new Args(['node', 'index']);
  test('Pass in 0 arguments (argv length 2)', () => {
    expect(argv.validInputs()).toEqual(false);
  });
});




