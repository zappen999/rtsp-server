const Camera = require('./lib/camera');
const Recorder = require('./lib/recorder');

const cam = new Camera(
  process.env.CAM_IP,
  process.env.CAM_URI,
  process.env.CAM_USER,
  process.env.CAM_PASS
);

const recorder = new Recorder(cam);

recorder.play();
