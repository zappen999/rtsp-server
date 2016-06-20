const ms = require('ms');

class Alarm {
  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} timeout Time string that the ms-module can parse
   * @return {Alarm}
   */
  constructor(timeout) {
    // Convert string to milliseconds
    this._timeout = ms(timeout);
    this._timer = null;

    // Events
    this._evts = {
      trigger: () => {}
    };

    // Start the timer
    this._startTimer();
  }

  /**
   * Starts the timer and saves a reference to it
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {void}
   */
  _startTimer() {
    this._timer = setTimeout(() => {
      // Trigger the function and start the timer again
      this._evts.trigger();
      this._startTimer();
    }, this._timeout);
  }

  /**
   * Clears the alarm timeout
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {void}
   */
  snooze() {
    clearTimeout(this._timer);

    // Restart the timer
    this._startTimer();
  }

  /**
   * Gets called when triggering
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string}   eventName Name of the event
   * @param  {Function} callback  Callback function
   * @throws Error                If the event name is invalid
   * @return {Alarm}              Self
   */
  on(eventName, callback) {
    if (['trigger'].indexOf(eventName) === -1) {
      throw new Error('Invalid event name');
    }

    if (typeof cb !== 'function') {
      throw new Error('Callback param must be a function');
    }

    this._evts[eventName] = callback;
    return this;
  }
}

module.exports = Alarm;
