'use strict';

const fs = require('fs');

const fo = module.exports = {};

fo.readBmp = (fd, callback) => {
  fs.readFile(fd, (err, data) => {
    if (err) throw err;
    callback(data);
  });
};

fo.writeBmp = (fd, data) => {
  fs.writeFile(fd, data, (err) => {
    if (err) throw err;
  });
};


