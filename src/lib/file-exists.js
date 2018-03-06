/**
 * Check if the given filepath exists in amazon s3
 * NOTE: This function only check file, it won't work with directory.
 *
 * @param {String} filepath
 * @returns {Promise<Boolean>}
 */
module.exports = (s3Client, filepath) => s3Client
  .headFileAsync(filepath)
  .then(response => response.statusCode === 200);
