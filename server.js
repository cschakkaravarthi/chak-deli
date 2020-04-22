const newrelic = require('newrelic');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const request = require('request');
const getPinoMiddleware = require('./logging').getPinoMiddleware;
const getAccessLoggers = require('./logging').getAccessLoggers;
const getLogger = require('./logging').getLogger;
const cfCookie = require('./middleware/cf-signed-cookie');

process.env.PORT = process.env.PORT || 5000;

const env = process.env;

const logger = getLogger();

const accessLoggers = getAccessLoggers();

const app = express();

app.get('/healthcheck', function (req, res) {
  res.send({ status: 'UP' });
});

app.use(cookieParser());
app.use(helmet());

// Logging middlewares
app.use(getPinoMiddleware());
for (const accessLogger of accessLoggers) {
  app.use(accessLogger);
}

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cfCookie(env));

app.use(express.static('dist'));

app.get('manifest.json', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'dist/manifest.json'));
});

app.get('*', function (req, res) {
  newrelic.setTransactionName(`get ${req.url}`);
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT, function (err) {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(
    `UMG Delivery Application started. Listening at http://localhost:${process.env.PORT}`
  );
});
