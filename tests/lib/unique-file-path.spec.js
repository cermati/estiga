const Bluebird = require('bluebird');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinon = require('sinon');
const _ = require('lodash');

const { expect } = chai;

chai.use(require('sinon-chai'));

describe('uniqueFilePath', () => {
  context('When file path is not exists', () => {

    const fileExistsStub = sinon.stub().returns(Bluebird.resolve(false));

    const uniqueFilePath = proxyquire('../../src/lib/unique-file-path', {
      './file-exists': fileExistsStub,
    });

    let result;
    const dummyS3Url = 'https://abc.xyz';

    const s3clientStub = {};

    before('Run the function', () => uniqueFilePath(s3clientStub, dummyS3Url)
      .then((res) => {
        result = res;
      }));

    it('Should return same url', () => {
      expect(result).to.equal(dummyS3Url);
    });
  });

  context('When file path is exists', () => {
    const fileExistsStub = sinon.stub()
      .onFirstCall()
      .returns(Bluebird.resolve(true))
      .onSecondCall()
      .returns(Bluebird.resolve(false));

    const uniqueFilePath = proxyquire('../../src/lib/unique-file-path', {
      './file-exists': fileExistsStub,
    });

    let result;
    const dummyS3Url = 'https://abc.xyz';

    const s3clientStub = {};

    before('Run the function', () => uniqueFilePath(s3clientStub, dummyS3Url)
      .then((res) => {
        result = res;
      }));

    it('Should return different url', () => {
      expect(result).to.not.equal(dummyS3Url);
    });
  });
});
