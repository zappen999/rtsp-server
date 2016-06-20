const ms = require('ms');

class Alarm {
  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} timeout      Time string that the ms-module can parse
   * @param  {string} initialDelay First start delay time
   * @return {Alarm}
   */
  constructor(timeout, initialDelay = '0ms') {
    // Convert string to milliseconds
    this._timeout = ms(timeout);
    this._timer = null;
    this._state = true;

    // Events
    this._evts = {
      trigger: () => {},
      resolve: () => {},
      snooze: () => {}
    };

    // Start the timer with an initial delay (if set)
    this._timer = setTimeout(() => {
      this._startTimer();
    }, ms(initialDelay));
  }

  /**
   * Starts the timer and saves a reference to it
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {void}
   */
  _startTimer() {
    this._timer = setTimeout(() => {
      // Trigger the function and start the timer again
      this._setState(false);
      clearTimeout(this._timer);
      this._startTimer();
    }, this._timeout);
  }

  /**
   * Clears the alarm timeout
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {void}
   */
  snooze() {
    // Clear the previous countdown
    clearTimeout(this._timer);

    // Set the state to OK
    this._setState(true);

    // Restart the timer
    this._startTimer();

    // Run the snooze event
    this._evts.snooze();
  }

  /**
   * Changes the state of the alarm
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {boolean} state New state
   */
  _setState(state) {
    // check if the state is changing
    if (this._state !== state) {
      if (state === false) {
        // Its a trigger
        this._evts.trigger();
      } else {
        // Its a resolve
        this._evts.resolve();
      }
    }

    this._state = state;
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
    if (['trigger', 'snooze', 'resolve'].indexOf(eventName) === -1) {
      throw new Error('Invalid event name');
    }

    if (typeof callback !== 'function') {
      throw new Error('Callback param must be a function');
    }

    this._evts[eventName] = callback;
    return this;
  }
}

module.exports = Alarm;
