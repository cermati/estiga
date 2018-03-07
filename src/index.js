/**
 * @module src/index
 * Main entry point to regist all libraries
*/
const _ = require('lodash');
const Bluebird = require('bluebird');
const knox = require('knox-s3');

const fileExists = require('./lib/file-exists');
const uniqueFilepath = require('./lib/unique-file-path');
const copy = require('./lib/copy');
const upload = require('./lib/upload');
const remove = require('./lib/remove');
const download = require('./lib/download');

const generatePrivateUrl = require('./lib/generate-private-url');

const mainLibraries = {
  fileExists,
  uniqueFilepath,
  copy,
  upload,
  remove,
  download,
};

module.exports = (credential) => {
  const {
    bucket,
    key,
    secret,
    region,
  } = credential;

  if (!bucket || !key || !secret || !region) {
    throw new Error('Incorrect credential');
  }

  const s3Client = Bluebird.promisifyAll(knox.createClient({
    bucket,
    key,
    secret,
    region,
  }));

  const libraries = _.mapValues(mainLibraries, mainLibrary => _.partial(mainLibrary, s3Client));

  _.assign(libraries, {
    generatePrivateUrl: _.partial(generatePrivateUrl, credential),
  });

  return libraries;
};
