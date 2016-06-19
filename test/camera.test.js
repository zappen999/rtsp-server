const chai = require('chai');
const expect = chai.expect;

const Camera = require('../lib/camera');

describe('Camera', () => {
  describe('Constructor', () => {
    it('should set name, id, uri', () => {
      const cam = new Camera('name', 'asd', 'uri');
      expect(cam._name).to.equal('name');
      expect(cam._id).to.equal('asd');
      expect(cam._uri).to.equal('uri');
    });
  });

  describe('Getters', () => {
    it('should get name, id, uri', () => {
      const cam = new Camera('name', 'asd', 'uri');
      expect(cam.name).to.equal('name');
      expect(cam.id).to.equal('asd');
      expect(cam.uri).to.equal('uri');
    });
  });
});
