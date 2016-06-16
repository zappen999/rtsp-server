const chai = require('chai');
const expect = chai.expect;

const Camera = require('../lib/camera');

describe('Camera', () => {
  describe('Constructor', () => {
    it('should set ip, uri, user, pass', () => {
      const cam = new Camera('ip', 'uri', 'user', 'pass');
      expect(cam._ip).to.equal('ip');
      expect(cam._uri).to.equal('uri');
      expect(cam._username).to.equal('user');
      expect(cam._password).to.equal('pass');
    });
  });

  describe('Getters', () => {
    it('should get ip, uri, user, pass', () => {
      const cam = new Camera('ip', 'uri', 'user', 'pass');
      expect(cam.ip).to.equal('ip');
      expect(cam.uri).to.equal('uri');
      expect(cam.username).to.equal('user');
      expect(cam.password).to.equal('pass');
    });
  });
});
