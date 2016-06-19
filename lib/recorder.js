const FfmpegCommand = require('fluent-ffmpeg');
const path = require('path');

/**
 * Recorder class
 * Provides recording functionality for a Camera instance using FFMPEG
 */

class Recorder {
  /**
   * Constructor
   * Example options object:
   * {
   *   outStream: <WritableStream>,
   *   ext: 'mp4',
   *   split: 8, // Seconds per video split
   *   storage: 'storage/' // Where to store the videos
   * }
   *
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Camera}   cam     The camera to record
   * @param  {object}   options Options for the recording
   * @return {Recorder}         Self
   */
  constructor(cam, options) {
    this._cam = cam;
    this._options = options;

    // Validate the options object
    this._validateOptions();

    this._cmd = new FfmpegCommand(this._cam.uri);
  }

  /**
   * Validates the values in the options object
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @throws Error  If some of the option values is invalid
   * @return {void}
   */
  _validateOptions() {
    if (typeof this._options.outStream !== 'function') {
      throw new Error('Invalid outStream option');
    }

    if (typeof this._options.ext !== 'string') {
      throw new Error('Invalid extension option');
    }

    // Set storage dir to current directory if not specified
    if (typeof this._options.storage === 'undefined') {
      this._options.storage = './';
    }
  }

  /**
   * Sets up the FFMpeg command to run
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Recorder} Self
   */
  setup() {
    // Construct the file name
    const fileName = `${this._cam.id}_%05d.${this._options.ext}`;

    // Set the input source
    this._cmd
      .noAudio()
      //.audioCodec('copy')
      //.videoCodec('copy')
      .size('640x?')
      .addOutputOption('-map 0')
      .addOutputOption(`-segment_time ${this._options.split}`)
      .addOutputOption('-f segment')
      .addOutputOption('-reset_timestamps 1')
      .addOutputOption('-segment_list_flags +live')
      .addOutputOption('-segment_list_size 10')
      .output(path.join(this._options.storage, fileName));
      //.output(this._options.outStream);

    return this;
  }

  /**
   * Sets up event listeners directly on the FFMpeg command instance
   * this must be executed before starting the recording. More info
   * in fluent-ffmpeg events section
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string}   eventName Name of the fluent-ffmpeg event
   * @param  {Function} cb        Callback
   * @return {Recorder}           Self
   */
  on(eventName, cb) {
    const valid = [
      'start',
      'codecData',
      'progress',
      'stderr',
      'error',
      'end'
    ];

    if (valid.indexOf(eventName) === -1) {
      throw new Error('Invalid event name');
    }

    if (typeof cb !== 'function') {
      throw new Error('Callback param must be a function');
    }

    this._cmd.on(eventName, cb);
    return this;
  }

  start() {
    this._cmd.run();
  }
}

module.exports = Recorder;
