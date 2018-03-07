/**
 * @module /utils/file.js
 */

const path = require('path');

/**
 * Insert timestamp to the given filepath
 *
 * @example
 *   > self.insertTimestampToFilepath('/test/file.jpg')
 *   '/test/file.<timestamp>.js'
 *
 * @param {String} filepath
 * @returns {String}
 */
exports.insertTimestampToFilepath = (filepath) => {
  const pathObject = path.parse(filepath);
  const timestamp = Date.now();

  return `${pathObject.dir}/${pathObject.name}.${timestamp}${pathObject.ext}`;
};

