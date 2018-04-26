const _ = require('lodash');
const proxyquire = require('proxyquire');
const chai = require('chai');

const { expect } = chai;

chai.use(require('sinon-chai'));

const credential = {
  baseUrl: 'anything.is.fine',
  bucket: 'somestring',
  key: 'somestring',
  secret: 'somestring',
  region: 'somestring',
};

const estiga = proxyquire('../../src', {})(credential);

describe('generatePrivateUrl', () => {
  it('Should generate correct private url', () => {
    const privateUrl = estiga.generatePrivateUrl('https://abc.xyz');
    const startWithAccessKey = _.startsWith(
      privateUrl,
      'https://abc.xyz?AWSAccessKeyId=somestring&Expires=',
    );

    const containSignature = privateUrl.includes('&Signature');

    expect(startWithAccessKey).equal(true);
    expect(containSignature).equal(true);
  });
});
