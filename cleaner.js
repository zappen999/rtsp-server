/**
 * Process that cleans old recordings
 */
const Dirmaid = require('dirmaid');

const maid = new Dirmaid('data/recordings/*.mp4', {
  interval: '60s',
  age: '1w',
});

maid.on('error', err => {
  console.log('Maid error', err);
});

maid.on('check', files => {
  console.log('Will remove files:', files);
});

// TODO: Change to run here later on
maid.test();
