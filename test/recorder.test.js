const chai = require('chai');
const expect = chai.expect;

const Recorder = require('../lib/recorder');

describe('Recorder', () => {
  describe('Constructor', () => {
    it('should cam, and options', () => {
      const opts = {
        outStream: () => {},
        ext: 'mp4',
        file: 'test'
      };
      const rec = new Recorder('camera', opts);
      expect(rec._cam).to.equal('camera');
      expect(rec._options).to.deep.equal(opts);
    });

    it('should set storage dir default', () => {
      const opts = {
        outStream: () => {},
        ext: 'mp4',
        file: 'test'
      };
      const rec = new Recorder('camera', opts);
      expect(rec._options.storage).to.equal('./');
    });

    it('should set storage directory', () => {
      const opts = {
        outStream: () => {},
        ext: 'mp4',
        file: 'test',
        storage: '/somepath'
      };
      const rec = new Recorder('camera', opts);
      expect(rec._options.storage).to.equal('/somepath');
    });
  });

  describe('Event setup', () => {
    it('should reject invalid event names', () => {
      const rec = new Recorder('cam', {
        outStream: () => {},
        ext: 'mp4'
      });

      expect(() => rec.on('invalidevent', () => {}))
        .to.throw('Invalid event name');
    });

    it('should reject non-function callback arg', () => {
      const rec = new Recorder('cam', {
        outStream: () => {},
        ext: 'mp4'
      });

      expect(() => rec.on('start', 'notafunction'))
        .to.throw('Callback param must be a function');
    });


  });

});
