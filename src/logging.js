import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import rfs from 'rotating-file-stream';
import * as fs from 'fs';
import * as Sentry from '@sentry/browser';
import * as SentryTransport from '@synapsestudios/winston-sentry';
import config from './config/config';

const { LOGS_PATH, MAX_FILES } = process.env;
const DEFAULT_MAX_FILES = 5;
const MAX_SIZE = '10M';

const setupDefaultLogsPath = () => {
  const logsDirectory = path.join('.', 'logs');
  if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
  }
  return logsDirectory;
};

const getLogsPath = () => LOGS_PATH || setupDefaultLogsPath();

const maxFiles = MAX_FILES || DEFAULT_MAX_FILES;

const getFileTransports = () => {
  const logsPath = getLogsPath();
  const baseRatationOptions = {
    maxSize: MAX_SIZE,
    maxFiles,
  };
  return [
    new DailyRotateFile({
      filename: path.join(logsPath, 'error.log'),
      level: 'error',
      ...baseRatationOptions,
    }),
    new DailyRotateFile({
      filename: path.join(logsPath, 'combined.log'),
      ...baseRatationOptions,
    }),
  ];
};

const getSetryTransport = () => new SentryTransport({ Sentry });

const getConsoleTransport = () => new winston.transports.Console();

const getProductionTransports = isServer =>
  isServer ? getFileTransports() : [getSetryTransport()];

const initLogging = ({ isServer }) => {
  const env = config.environment;

  if (isServer) {
    // Sentry needs to be initialised before calling getSetryTransport()
    // or before using the Sentry express middleware
    Sentry.init({
      dsn: config.sentryDsn,
      environment: config.environment,
    });
  }

  let transports;
  if (env === 'test') {
    transports = [];
  } else if (env === 'local') {
    transports = [getConsoleTransport()];
  } else if (env === 'production') {
    transports = getProductionTransports(isServer);
  }
  winston.configure({
    transports,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.printf(info => `${JSON.stringify(info)}`),
    ),
  });

  return winston;
};

export const getMorganStream = () =>
  rfs('access.log', {
    maxFiles,
    size: MAX_SIZE,
    path: getLogsPath(),
  });

export default initLogging;
