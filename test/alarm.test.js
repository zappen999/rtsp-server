const chai = require('chai');
const expect = chai.expect;

const Alarm = require('../lib/alarm');

describe('Alarm', () => {
  describe('Constructor', () => {
    it('should set the timeout', () => {
      const a = new Alarm('1s');
      expect(a._timeout).to.equal(1000);
    });
  });

  describe('Event setup', () => {
    it('should reject invalid event names', () => {
      const a = new Alarm('2s');

      expect(() => a.on('invalidevent', () => {}))
        .to.throw('Invalid event name');
    });

    it('should reject non-function callback arg', () => {
      const a = new Alarm('1s');

      expect(() => a.on('trigger', 'notafunction'))
        .to.throw('Callback param must be a function');
    });
  });
});
