const ms = require('ms');

class Alarm {
  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} timeout Time string that the ms-module can parse
   * @return {Alarm}
   */
  construct(timeout) {
    // Convert string to milliseconds
    this._timeout = ms(timeout);
    this._timer = null;

    // Events
    this._onTrigger = null;

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
      this._onTrigger();
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
   * @param  {Function} callback Callback function
   * @return {Alarm}             Self
   */
  onTrigger(callback) {
    this._onTrigger = callback;
  }
}

module.exports = Alarm;
