const Camera = require('./lib/camera');
const Recorder = require('./lib/recorder');
const Alarm = require('./lib/alarm');

const alarm = new Alarm('10s');

alarm.on('trigger', () => {
  console.log('Alarma!');
});

const cam = new Camera(
  process.env.CAM_NAME,
  process.env.CAM_ID,
  process.env.CAM_URI
);

const rec = new Recorder(cam, {
  outStream: () => {},
  ext: process.env.DST_EXT,
  split: process.env.SPLIT,
  storage: process.env.STORAGE
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
  alarm.snooze();
  console.log('Snoozin');
});

rec.setup();
rec.start();
