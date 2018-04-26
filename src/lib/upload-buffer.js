/**
 * @module src/lib/upload.js
 */

const _ = require('lodash');
const Bluebird = require('bluebird');
const util = require('util');

/**
 * Upload file to S3
 * @param {Object} fileData
 * @param {String} fileData.buffer - File buffer
 * @param {String} destination
 * @return {Promise}
 */
module.exports = (s3Client, fileData, destination, options = { log: _.noop }) => {
  const file = fileData;
  const { log } = options;

  log(
    '\nUPLOADING file to S3 \nS3 path: %s\n',
    destination,
  );

  const promise = new Bluebird((resolve, reject) =>
    s3Client.putBuffer(file.buffer, destination, (err, res) => {
      if (err) {
        return reject(err);
      }

      res.resume();
      res.on('end', resolve);

      return resolve();
    }));

  return promise
    .then(() => {
      log('\nUPLOADED file to S3\nS3 path: %s\n', destination);

      return file;
    })
    .catch((error) => {
      const rejectError = new Error(util.format(
        'Could not upload to %s, error: %s',
        destination,
        error,
      ));

      return Bluebird.reject(rejectError);
    });
};
