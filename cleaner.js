/**
 * Process that cleans old recordings
 */
const Dirmaid = require('dirmaid');

// Logging
const winston = require('winston');
require('./logging');
const dirmaidLog = winston.loggers.get('dirmaid');

dirmaidLog.info(
  'Starting dirmaid with 60s interval, removing files older than 1w'
);

const maid = new Dirmaid('data/recordings/*.mp4', {
  interval: '60s',
  age: '1w',
});

maid.on('error', err => {
  dirmaidLog.error('Dirmaid error', err);
});

maid.on('check', files => {
  dirmaidLog.info('Removing files:', files);
});

// TODO: Change to run here later on
maid.test();
