const Camera = require('./lib/camera');
const Recorder = require('./lib/recorder');
const Alarm = require('./lib/alarm');
const sendgrid = require('sendgrid')(process.env.SENDGRID_APIKEY);

// Logging
require('./logging');
const winston = require('winston');
const emailLog = winston.loggers.get('emaillog');
const recorderLog = winston.loggers.get('recorder');

/**
 * Setup an alarm to notify the admin when the recorder hasnt recieved progress
 * information in a while, 10s dietime, 15s warmup time
 */
recorderLog.debug('Setting up alarm with 10s dietime and 15s warmup time');
const alarm = new Alarm('15s', '15s');

/**
 * Setup the camera
 */
const cam = new Camera(
  process.env.CAM_NAME,
  process.env.CAM_ID,
  process.env.CAM_URI
);

/**
 * Setup the recorder
 */
const rec = new Recorder(cam, {
  outStream: () => {},
  ext: process.env.DST_EXT,
  split: process.env.SPLIT,
  storage: process.env.STORAGE
});

/**
 * Configure alerts via email
 */
alarm.on('trigger', () => {
  emailLog.info('Setting up trigger email...');
  const email = new sendgrid.Email();
  email.addTo(process.env.ALARM_EMAIL);
  email.setFrom(process.env.SYSTEM_EMAIL);
  email.setSubject(`Problems with camera '${cam.id}'`);
  email.setHtml(`No response from camera '${cam.id}' the last 15 seconds.`);

  emailLog.info(`Sending trigger email to ${process.env.ALARM_EMAIL}`);
  sendgrid.send(email, (err, res) => {
    if (err) {
      return emailLog.error('Could not send trigger email', err);
    }

    emailLog.info('Sent trigger email successfully!', res);
  });
});

/**
 * Send email if the alarm resolves automatically
 */
alarm.on('resolve', () => {
  emailLog.info('Setting up resolve email...');
  const email = new sendgrid.Email();
  email.addTo(process.env.ALARM_EMAIL);
  email.setFrom(process.env.SYSTEM_EMAIL);
  email.setSubject(`Problem solved with cam ${cam.id}`);
  email.setHtml(`The issue with camera '${cam.id}' has been resolved.`);
  emailLog.info(`Sending resolve email to ${process.env.ALARM_EMAIL}`);
  sendgrid.send(email, (err, res) => {
    if (err) {
      return emailLog.error('Could not send resolve email', err);
    }

    emailLog.info('Sent resolve email successfully!', res);
  });
});

alarm.on('snooze', () => {
  recorderLog.debug('Snoozing...');
});

/**
 * Setup recording listeners
 */
rec.on('start', cmd => {
  recorderLog.info('Starting recorder', cmd);
});

rec.on('error', err => {
  recorderLog.error('Recorder error', err);
});

rec.on('stderr', errLine => {
  recorderLog.info('FFMPEG stdout:', errLine);
});

rec.on('progress', info => {
  recorderLog.debug('Progress...', info);
  alarm.snooze();
});

rec.setup();
rec.start();
