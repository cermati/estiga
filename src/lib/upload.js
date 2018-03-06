/**
 * @module src/lib/upload.js
 */

const _ = require('lodash');
const Bluebird = require('bluebird');
const util = require('util');

/**
 * Upload file to S3
 * @param {Object|String} fileData - If string then it will create fileData object
 *   and assign the given string to `fileData.path`.
 * @param {String} fileData.path - File path in the filesystem
 * @param {String} fileData.mimetype - File type
 * @param {String} destination
 * @return {Promise}
 */
module.exports = (s3Client, fileData, destination, logger = console) => {
  let file = fileData;

  if (_.isString(fileData)) {
    file = {
      path: fileData,
    };
  }

  logger.info(
    '\nUPLOADING file to S3 \nlocal path: %s \nS3 path: %s\n',
    file.path,
    destination,
  );

  const promise = new Bluebird((resolve, reject) =>
    s3Client.putFile(file.path, destination, (err, res) => {
      if (err) {
        return reject(err);
      }

      res.resume();
      res.on('end', resolve);

      return resolve();
    }));

  return promise
    .then(() => {
      logger.info('\nUPLOADED file to S3\nlocal path:%s \nS3 path: %s\n', file.path, destination);

      return file;
    })
    .catch((error) => {
      const rejectError = new Error(util.format(
        'Could not upload %s to %s, error: %s',
        file.path,
        destination,
        error,
      ));

      return Bluebird.reject(rejectError);
    });
};