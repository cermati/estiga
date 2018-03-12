const Bluebird = require('bluebird');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

chai.use(require('sinon-chai'));

const copy = proxyquire('../../src/lib/copy', {});

describe('Copy', () => {
  context('If give source and destination', () => {
    let result;

    const s3clientStub = {
      copyFileAsync: sinon.stub().returns(Bluebird.resolve()),
    };

    before('Run the function', () => copy(s3clientStub, 'https://abc.xyz', 'https://xyz.abc')
      .then((res) => {
        result = res;
      }));

    it('Should return true and call copyFileAsync', () => {
      expect(result).to.equal(true);
      expect(s3clientStub.copyFileAsync).to.be.called;
    });
  });
});
