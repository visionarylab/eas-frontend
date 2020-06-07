/* eslint-disable no-console */

let config = {};
const environment = process.env.APP_ENV;

try {
  const baseConfig = {
    sentryDsn: 'https://31465bb4331a44fc9262616650942a64@o240694.ingest.sentry.io/1413974',
  };

  const environmentConfig = require(`./${environment}`); // eslint-disable-line
  config = { ...baseConfig, ...environmentConfig };
} catch (e) {
  console.error('No application config could be found.', e);
}

module.exports = config;
