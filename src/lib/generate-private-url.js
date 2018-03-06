/**
 * @module /src/lib/generate-private-url.js
*/

const _ = require('lodash');
const util = require('util');
const crypto = require('crypto');

const constant = require('../../utils/constants');

function generateCanonicalString(url, expires) {
  const strippedBaseUrl = `/${url.split('/').slice(3).join('/')}`;

  return util.format('GET\n\n\n%s\n%s', expires, strippedBaseUrl);
}

function generateSignedUrl(url, expires, accessKey, signature) {
  // This format is from the developer guide
  // http://s3.amazonaws.com/doc/s3-developer-guide/RESTAuthentication.html
  return `${url}?AWSAccessKeyId=${accessKey}&Expires=${expires}&Signature=${signature}`;
}

function generateSignature(data, awsSecretKey) {
  const hmac = crypto.createHmac('sha1', awsSecretKey);
  hmac.write(data);
  hmac.setEncoding('base64');
  hmac.end();

  return encodeURIComponent(hmac.read());
}

/**
 * Generate private url for the given url
 * @param url
 * @returns {string}
 */
module.exports = (credential, url, generateSignedUrlOptions) => {
  const { secret, key } = credential;

  const options = _.defaults(generateSignedUrlOptions, {
    limit: constant.expirationLimit,
  });

  const now = new Date();
  const expires = Math.floor(now / 1000) + options.limit;
  const canonicalString = generateCanonicalString(url, expires);
  const signature = generateSignature(canonicalString, secret);

  return generateSignedUrl(url, expires, key, signature);
};
