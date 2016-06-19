const Camera = require('./lib/camera');
const Recorder = require('./lib/recorder');

const cam = new Camera(
  process.env.CAM_NAME,
  process.env.CAM_ID,
  process.env.CAM_URI
);

const rec = new Recorder(cam, {
  outStream: () => {},
  ext: process.env.DST_EXT,
  split: process.env.SPLIT
});

rec.on('start', (cmd) => {
  console.log('Starting recorder', cmd);
});

rec.on('error', err => {
  console.log('Recorder error', err);
});

rec.on('stderr', errLine => {
  console.log('FFMPEG err:', errLine);
});

// TODO: Alarm if no progress in some minutes??
rec.on('progress', info => {
  //console.log('Progress', info);
});

rec.setup();
rec.start();



console.log('Has started process');
