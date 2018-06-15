'use strict';

const trans = module.exports = {};

trans.doTransform = (transform, bitmap) => {
  console.log('doing transform', transform);
  console.log(JSON.stringify(bitmap.colorTable(), null, 2));
};
