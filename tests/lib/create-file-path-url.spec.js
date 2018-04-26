const _ = require('lodash');
const proxyquire = require('proxyquire');
const chai = require('chai');

const { expect } = chai;

chai.use(require('sinon-chai'));

const credential = {
  baseUrl: 'pikachu.ash',
  bucket: 'somestring',
  key: 'somestring',
  secret: 'somestring',
  region: 'somestring',
};

const estiga = proxyquire('../../src', {})(credential);

describe('createFilePathUrl', () => {
  it('Should generate correct s3 full file path url', () => {
    const filePathUrl = estiga.createFilePathUrl('thunder/bolt');

    const expectedResult = `https://pikachu.ash/somestring/thunder/bolt`;

    expect(filePathUrl).equal(expectedResult);
  });
});

