const _ = require('lodash');

/**
 * Create full url to amazon s3
 * @param path
 * @returns {string}
 */
module.exports = (credential, path) => {
  const { baseUrl, bucket } = credential;

  return `https://${baseUrl}/${bucket}/${_.trim(path, '/')}`;
};

