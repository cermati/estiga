const _ = require('lodash');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

chai.use(require('sinon-chai'));

const upload = proxyquire('../../src/lib/upload', {});

describe('Copy', () => {
  context('If give file data and s3 destination path', () => {
    let result;

    const dummyRes = {
      resume: sinon.stub(),
      on: sinon.stub(),
    };

    const s3clientStub = {
      putFile: (path, dest, callback) => {
        callback(undefined, dummyRes);
      },
    };

    const dummyFileData = '/i/want/go/to/home/';
    const dummyDestination = '/no/you/cannot/';

    const expectedResult = {
      path: dummyFileData,
    };

    before('Run the function', () => upload(s3clientStub, dummyFileData, dummyDestination)
      .then((res) => {
        result = res;
      }));

    it('Should call res.resume, res.on, and return path', () => {
      expect(dummyRes.on).to.be.calledWith('end');
      expect(dummyRes.resume).to.be.called;
      expect(_.isEqual(result, expectedResult)).to.be.true;
    });
  });
});
