function isServer() {
  return !(typeof window !== 'undefined' && window.document);
}

let config = {};
try {
  const environment = process.env.REACT_APP_ENV;
  if (environment !== 'production') {
    console.log(`Loading application config for environment: ${environment}`); // eslint-disable-line no-console
  }

  const baseConfig = {
    environment,
    domain: 'https://echaloasuerte.com',
    isServer: isServer(),
  };

  const environmentConfig = require(`./${environment}`).default; // eslint-disable-line

  config = Object.assign({}, baseConfig, environmentConfig);

  // Disable logs and events when rendering in server
  config.googleAnaliticsEnabled = !isServer && config.googleAnaliticsEnabled;
  config.sentryEnabled = !isServer && config.sentryEnabled;
} catch (e) {
  console.log('No application config could be found.', e); // eslint-disable-line no-console
}

module.exports = config;
