/**
 * @module /src/lib/remove.js
 */

const _ = require('lodash');
const util = require('util');
const Bluebird = require('bluebird');

/**
 * Delete file(s) on amazon S3.
 * If the remote path given is an array then it will delete all of the files
 * listed in the list.
 * @param remotePath
 * @return {Promise} - Bluebird promise instance
 */
module.exports = (s3Client, remotePath, logger = console) => {
  let promise;

  logger.info('\nDELETING file %s on S3\n', remotePath);

  if (_.isArray(remotePath)) {
    promise = s3Client
      .deleteMultipleAsync(remotePath)
      .then((response) => {
        logger.info('\nDELETED file %s on S3\n', remotePath);

        return response;
      })
      .catch((error) => {
        const rejectError = new Error(util.format(
          'Could not delete %s on S3, error: %s',
          remotePath,
          error,
        ));

        return Bluebird.reject(rejectError);
      });
  } else {
    promise = s3Client
      .deleteFileAsync(remotePath)
      .then((response) => {
        logger.info('\nDELETED file %s on S3\n', remotePath);

        return response;
      })
      .catch((error) => {
        const rejectError = new Error(util.format(
          'Could not delete %s on S3, error: %s',
          remotePath,
          error,
        ));

        return Bluebird.reject(rejectError);
      });
  }

  return promise;
};
