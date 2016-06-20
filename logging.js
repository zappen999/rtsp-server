/**
 * Setup logging
 */
const winston = require('winston');

// Configure logger for email
winston.loggers.add('email', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'Email log',
  },
  file: {
    filename: './logs/email.log',
  },
});

// Configure logger for recorders
winston.loggers.add('recorder', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'Recorder',
  },
  file: {
    level: 'warn',
    filename: './logs/recorder.log',
  },
});

// Configure logger for dirmaid
winston.loggers.add('dirmaid', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'Dirmaid',
  },
  file: {
    level: 'info',
    filename: './logs/dirmaid.log',
  },
});

// Report in that the logging is working
const recorder = winston.loggers.get('recorder');
recorder.info('Logging setup successfully');
