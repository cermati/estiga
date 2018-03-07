/**
 * @module /src/lib/copy.js
*/

const _ = require('lodash');
const util = require('util');
const Bluebird = require('bluebird');

/**
 * Copy s3 file from source path to destination path
 * @param source
 * @param destination
 * @return {Promise}
 */
module.exports = (s3Client, source, destination, options = { log: _.noop }) => {
  const { log } = options;

  log('\nCOPYING file from S3 \nsource: %s \nto S3 path: %s\n', source, destination);

  return s3Client
    .copyFileAsync(source, destination)
    .then(() => {
      log('\nCOPIED file from S3\nsource:%s \nto S3 path: %s\n', source, destination);

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
