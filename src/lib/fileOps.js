'use strict';

const fs = require('fs');

const fo = module.exports = {};

fo.readBmp = (fd, callback) => {
  console.log('readBmp function');
  fs.readFile(fd, (err, data) => {
    if (err) throw err;
    callback(data);
  });
};

fo.writeBmp = (fd, data, callback) => {
  console.log('writeBmp function');
  // fs.writeFile(fd, data, { encoding: null }, callback(err));
  callback('error test');
};
