const expressPino = require('express-pino-logger');
const rfs = require('rotating-file-stream');
const morgan = require('morgan');
const pino = require('pino');
const pinoms = require('pino-multi-stream');
const fs = require('fs');
const config = process.env;

const loggingSettings = JSON.parse(config.logging);

const getRotatingStream = name => {
  return rfs(name, {
    size: loggingSettings.LOGGING_MAX_SIZE || '10M',
    interval: loggingSettings.LOGGING_INTERVAL || '1d',
    path: loggingSettings.LOGGING_PATH || 'logs/',
    compress: loggingSettings.LOGGING_COMPRESS || 'gzip'
  });
};

const streams = [
  {
    level: loggingSettings.LOGGING_LEVEL,
    stream: process.stdout
  },
  {
    level: 'info',
    stream: getRotatingStream('info.log')
  },
  {
    level: 'error',
    stream: getRotatingStream('error.log')
  }
];

module.exports.getPinoMiddleware = () => {
  return expressPino({
    level: loggingSettings.LOGGING_LEVEL || 'info',
    name: 'middleware',
    useLevelLabels: true
  });
};

module.exports.getAccessLoggers = () => {
  const allRotatingStream = getRotatingStream('access.log');
  const commonRotatingStream = getRotatingStream('common.log');
  const errorsRotatingStream = getRotatingStream('access_error.log');
  const loggingFormat = loggingSettings.LOGGING_ACCESS_FORMAT || 'combined';
  const defaultAccessLog = morgan(loggingFormat, { stream: allRotatingStream });

  return [
    defaultAccessLog,
    morgan(loggingFormat, {
      stream: errorsRotatingStream,
      skip: function (req, res) {
        return res.statusCode < 400;
      }
    }),
    morgan('common', { stream: commonRotatingStream })
  ];
};

const getLogger = () => {
  fs.existsSync(loggingSettings.LOGGING_PATH || 'logs/') ||
    fs.mkdirSync(loggingSettings.LOGGING_PATH || 'logs');

  return pino(
    {
      name: 'umgc_delivery',
      level: loggingSettings.LOGGING_LEVEL || 'info',
      useLevelLabels: true
    },
    pinoms.multistream(streams)
  );
};

module.exports.getLogger = getLogger;

module.exports.getChildLogger = module => {
  const rootLogger = getLogger();
  return rootLogger.child({ name: `${rootLogger.bindings().name}/${module}` });
};
