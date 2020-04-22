const split = require('split2');
const pump = require('pump');
const through = require('through2');
const splunk = require('splunk-logging');
const pino = require('pino');
const config = process.env;

const loggingSettings = JSON.parse(config.logging);
const defaultLevels = pino().levels;

const initializeSplunkLogger = () => {
  const config = {
    token: loggingSettings.LOGGING_SPLUNK_TOKEN,
    url: loggingSettings.LOGGING_SPLUNK_URL,
    port: 443,
    batchInterval: parseInt(loggingSettings.LOGGING_SPLUNK_BATCH_INTERVAL || 1000),
    maxBatchCount: parseInt(loggingSettings.LOGGING_SPLUNK_MAX_BATCH_COUNT || 10),
    maxBatchSize: parseInt(loggingSettings.LOGGING_SPLUNK_MAX_BATCH_SIZE || 1024),
    level: loggingSettings.LOGGING_LEVEL || 'debug'
  };
  const logger = new splunk.Logger(config);
  logger.eventFormatter = function (message, severity) {
    message.severity = severity;
    return message;
  };
  logger.requestOptions.strictSSL = false;

  return logger;
};

const extractHeader = (headers, key) => {
  if (headers && headers[key]) {
    return headers[key] || null;
  }
  return null;
};

const logger = initializeSplunkLogger();

const transform = data => {
  const transformedData = {};
  transformedData.message = {};
  if (data.msg) {
    transformedData.message.message = data.msg;
  }
  if (data.time) {
    transformedData.message.event_time = data.time;
  }

  transformedData.message.environment = process.env.ENV || process.env.NODE_ENV || 'qa';

  if (data.name) {
    transformedData.message.logger = data.name;
  } else {
    transformedData.message.logger = null;
  }

  if (data.pid) {
    transformedData.message.thread = data.pid;
  } else {
    transformedData.message.thread = null;
  }

  if (data.message_id) {
    transformedData.message.message_id = data.message_id;
  } else {
    transformedData.message.message_id = null;
  }

  if (data.object) {
    transformedData.message.object = data.object;
  } else {
    transformedData.message.object = null;
  }

  if (data.object_id) {
    transformedData.message.object_id = data.object_id;
  } else {
    transformedData.message.object_id = null;
  }

  if (data.exception) {
    transformedData.message.exception = data.exception;
  } else {
    transformedData.message.exception = null;
  }

  if (data.req) {
    transformedData.message.user = data.req.user || '-';
    transformedData.message.endpoint = data.req.url;
    transformedData.message.log_type = 'access';
    transformedData.message.method = data.req.method;
    transformedData.message.ip_address = extractHeader(data.req.headers, 'x-real-ip');
    transformedData.message.origin = extractHeader(data.req.headers, 'origin');
    transformedData.message.referer = extractHeader(data.req.headers, 'referer');
    transformedData.message['x-forwarded-server'] = extractHeader(data.req.headers, 'x-forwarded-server');
    transformedData.message['x-forwarded-host'] = extractHeader(data.req.headers, 'x-forwarded-host');
  } else {
    transformedData.message.user = null;
    transformedData.message.endpoint = null;
    transformedData.message.log_type = 'application';
    transformedData.message.method = null;
    transformedData.message.ip_address = null;
    transformedData.message.origin = null;
    transformedData.message.referer = null;
    transformedData.message['x-forwarded-server'] = null;
    transformedData.message['x-forwarded-host'] = null;
  }

  if (data.hostname) {
    transformedData.message.hostname = data.hostname;
  } else {
    transformedData.message.hostname = null;
  }

  transformedData.message.application = 'umgc_delivery';

  if (data.level) {
    if (typeof data.level === 'number') {
      data.level = defaultLevels.labels[data.level];
    }
    transformedData.severity = data.level.toUpperCase();
  }

  return transformedData.message;
};

const myTransport = through.obj(function (chunk, enc, cb) {
  // do the necessary
  const transformedData = transform(chunk);
  logger.send({ message: transformedData });
  cb();
});

pump(process.stdin, split(JSON.parse), myTransport);
