const _ = require('lodash');
const Bluebird = require('bluebird');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

chai.use(require('sinon-chai'));

const fsStub = {
  createWriteStream: () => ({
    on: () => ({
      on: _.noop,
    }),
  }),
  '@noCallThru': true,
};

const download = proxyquire('../../src/lib/download', {
  fs: fsStub,
});

describe('download', () => {
  let result;
  context('If give s3path and download destination', () => {
    const dummyCallback = {
      on: () => ({
        pipe: () => {},
      }),
    };

    const s3clientStub = {
      getFile: (path, callback) => {
        callback(undefined, dummyCallback);
      },
    };

    const dummys3Path = '/i/want/go/to/home/';
    const dummyDestination = '/no/you/cannot/';


    before('Run the function', () => download(s3clientStub, dummys3Path, dummyDestination)
      .then((res) => {
        result = res;
      }));

    it('Should return destinatio path', () => {
      expect(result).is.equal(dummyDestination);
    });
  });
});
