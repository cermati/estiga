/**
 * @module src/lib/uniqueFilepath.js
*/

const self = exports;
const fileExists = require('./file-exists');
const fileUtils = require('../../utils/file');

/**
 * Returns unique filepath if the given filepath exists in amazon s3. It will
 * append '.<unix timestamp>' before file's extension.
 *
 * @example
 *   > const fileExists = self.fileExists
 *   > let counter = 0
 *   > self.fileExists = () => counter++ == 0 ? Promise.resolve(true) : Promise.resolve(false)
 *   > self.uniqueFilepath('/yo/file.jpg').then(console.log)
 *   '/yo/file.<timestamp>.jpg'
 *
 * @param {String} filepath
 * @returns {Promise<String>}
 */
exports.uniqueFilepath = (s3Client, filepath) => fileExists(s3Client, filepath)
  .then((exists) => {
    if (exists) {
      return self.uniqueFilepath(s3Client, fileUtils.insertTimestampToFilepath(filepath));
    }

    return filepath;
  });

module.exports = self.uniqueFilepath;
