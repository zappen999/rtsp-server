/**
 * Camera entity
 */
class Camera {
  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} name     Name of the camera
   * @param  {string} id       ID of the camera
   * @param  {string} uri      URI to the RTSP stream
   * @return {Camera}           Self
   */
  constructor(name, id, uri) {
    this._name = name;
    this._id = id;
    this._uri = uri;
  }

  /**
   * Getters and setters
   */

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get uri() {
    return this._uri;
  }

  set uri(uri) {
    this._uri = uri;
  }
}

module.exports = Camera;
