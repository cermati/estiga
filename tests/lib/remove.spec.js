const _ = require('lodash');
const Bluebird = require('bluebird');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

chai.use(require('sinon-chai'));

const remove = proxyquire('../../src/lib/remove', {});

describe('Remove', () => {
  context('If path is not array', () => {
    let result;
    const responseStub = {};

    const s3clientStub = {
      deleteFileAsync: sinon.stub().returns(Bluebird.resolve(responseStub)),
    };

    before('Run the function', () => remove(s3clientStub, 'https://abc.xyz')
      .then((res) => {
        result = res;
      }));

    it('should call deleteFileAsync', () => {
      expect(_.isEqual(result, responseStub)).to.equal(true);
      expect(s3clientStub.deleteFileAsync).to.be.called;
    });
  });

  context('If path is an array', () => {
    let result;
    const responseStub = {};

    const s3clientStub = {
      deleteMultipleAsync: sinon.stub().returns(Bluebird.resolve(responseStub)),
    };

    before('Run the function', () => remove(s3clientStub, ['https://abc.xyz', 'https://xyz.abc'])
      .then((res) => {
        result = res;
      }));

    it('should call deleteMultipleAsync', () => {
      expect(_.isEqual(result, responseStub)).to.equal(true);
      expect(s3clientStub.deleteMultipleAsync).to.be.called;
    });
  });
});
