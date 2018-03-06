/**
 * @module /src/lib/copy.js
*/

const util = require('util');
const Bluebird = require('bluebird');

/**
 * Copy s3 file from source path to destination path
 * @param source
 * @param destination
 * @return {Promise}
 */
module.exports = (s3Client, source, destination, logger = console) => {
  logger.info('\nCOPYING file from S3 \nsource: %s \nto S3 path: %s\n', source, destination);

  return s3Client
    .copyFileAsync(source, destination)
    .then(() => {
      logger.info('\nCOPIED file from S3\nsource:%s \nto S3 path: %s\n', source, destination);

      return true;
    })
    .catch((error) => {
      const rejectError = new Error(util.format(
        'Could not copy %s to %s, error: %s',
        source,
        destination,
        error,
      ));

      return Bluebird.reject(rejectError);
    });
};
