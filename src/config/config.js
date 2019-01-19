/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

const isServer = !(typeof window !== 'undefined' && window.document);

let config = {};
let environment;

if (process.env.REACT_APP_ENV) {
  environment = process.env.REACT_APP_ENV;
} else if (window && window.__internal) {
  environment = window.__internal.ENVIRONMENT;
}

if (environment) {
  try {
    if (environment !== 'production') {
      console.log(`Loading application config for environment: ${environment}`);
    }

    const baseConfig = {
      environment,
      domain: 'https://echaloasuerte.com',
      isServer,
    };

    const environmentConfig = require(`./${environment}`).default; // eslint-disable-line 

    config = Object.assign({}, baseConfig, environmentConfig);

    console.log('isServer', isServer);
    console.log('process.env.REACT_APP_ENV', process.env.REACT_APP_ENV);
    console.log('config.googleAnaliticsEnabled', config.googleAnaliticsEnabled);
    // Disable logs and events when rendering in server
    config.googleAnaliticsEnabled = !isServer && config.googleAnaliticsEnabled;
    config.sentryEnabled = !isServer && config.sentryEnabled;
  } catch (e) {
    console.error('No application config could be found.', e);
  }
} else {
  console.error('No environment specified. Please set the REACT_APP_ENV environment variable');
}

module.exports = config;
