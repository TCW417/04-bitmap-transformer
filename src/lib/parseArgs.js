'use strict';

const parseArgs = module.exports = {};

parseArgs.parseArgs = (argv) => {
  console.log('Args:', argv.slice(2));
};
