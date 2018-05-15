/**
 * @module /src/lib/download.js
 */

const _ = require('lodash');
const fs = require('fs');
const util = require('util');
const Bluebird = require('bluebird');

/**
 * Download file from S3.
 * @param s3Path
 * @param destination
 * @return {Promise}
 */
module.exports = (s3Client, s3Path, destination, options = { log: _.noop }) => {
  const { log } = options;

  log(
    'Downloading file from S3 \nS3 path: %s \nDestination Path: %s\n',
    s3Path,
    destination,
  );

  const promise = new Bluebird((resolve, reject) => {
    const writeStream = fs.createWriteStream(destination);

    return s3Client.getFile(s3Path, (err, downloadStream) => {
      if (err) {
        return reject(err);
      }

      writeStream
        .on('finish', resolve)
        .on('error', reject);

      downloadStream
        .on('error', reject)
        .pipe(writeStream);
    });
  });

  return promise
    .then(() => {
      log('\nDownloaded file from S3\nS3 path: %s\nto local path:%s \n', s3Path, destination);

      return Bluebird.resolve(destination);
    })
    .catch((error) => {
      const rejectError = new Error(util.format(
        'Could not download %s to %s, error: %s',
        s3Path,
        destination,
        error,
      ));

      return Bluebird.reject(rejectError);
    });
};
