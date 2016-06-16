/**
 * Camera entity
 */
class Camera {
  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} ip       IP to the camera
   * @param  {string} uri      Path to rtsp stream
   * @param  {string} username Username if basic auth
   * @param  {string} password Password if basic auth
   * @return {Camera}          Self
   */
  constructor(ip, uri, username = null, password = null) {
    this._ip = ip;
    this._uri = uri;
    this._username = username;
    this._password = password;
  }

  /**
   * Getters and setters
   */

  get ip() {
    return this._ip;
  }

  set ip(ip) {
    this._ip = ip;
  }

  get uri() {
    return this._uri;
  }

  set uri(uri) {
    this._uri = uri;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    this._username = username;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    this._password = password;
  }
}

module.exports = Camera;
