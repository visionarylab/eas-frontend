// Express requirements
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';
import * as fs from 'fs';
import path from 'path';
import * as Sentry from '@sentry/node';
import config from '../src/config/config';
import setupApi from '../src/setupApi';

// Our loader - this basically acts as the entry point for each page load
import loader from './loader.jsx';

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;

// Setup the EAS API
setupApi();

// Setup error logs
Sentry.init({
  dsn: config.sentryDsn,
  environment: config.environment,
});
app.use(Sentry.Handlers.requestHandler());

// Setup access logs
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const accessLogStream = rfs('access.log', {
  maxFiles: process.env.LOGS_MAX_FILES || 5,
  size: '10M',
  path: process.env.LOGS_PATH || logDirectory,
});
app.use(morgan('combined', { stream: accessLogStream }));

// Compress, parse, log, and raid the cookie jar
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up homepage, static assets, and capture everything else
app.use(express.Router().get('/', loader));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(loader);

app.listen(PORT, console.log(`App listening on port ${PORT}!`));

// Sentry error handling
app.use(Sentry.Handlers.errorHandler());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.statusCode = 500;
  res.end(`Something went bad, but we are working very hard to fix it.`);
});

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
