const Bluebird = require('bluebird');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

chai.use(require('sinon-chai'));

const fileExists = proxyquire('../../src/lib/file-exists', {});

describe('fileExists', () => {
  context('If response status code is 200', () => {
    let result;
    const responseStub = {
      statusCode: 200,
    };

    const s3clientStub = {
      headFileAsync: sinon.stub().returns(Bluebird.resolve(responseStub)),
    };

    before('Run the function', () => fileExists(s3clientStub, 'https://abc.xyz')
      .then((res) => {
        result = res;
      }));

    it('Should return true', () => {
      expect(result).to.equal(true);
      expect(s3clientStub.headFileAsync).to.be.calledOnce;
    });
  });

  context('If response status code is not 200', () => {
    let result;
    const responseStub = {
      statusCode: 999,
    };

    const s3clientStub = {
      headFileAsync: sinon.stub().returns(Bluebird.resolve(responseStub)),
    };

    before('Run the function', () => fileExists(s3clientStub, 'https://abc.xyz')
      .then((res) => {
        result = res;
      }));

    it('Should return false', () => {
      expect(result).to.equal(false);
      expect(s3clientStub.headFileAsync).to.be.calledOnce;
    });
  });
});
