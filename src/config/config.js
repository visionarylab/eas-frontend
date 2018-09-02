let config = {};
try {
  const environment = process.env.REACT_APP_ENV;
  console.log(`Loading application config for environment: ${environment}`);
  config = Object.assign({}, { environment }, require(`./${environment}`).default);  // eslint-disable-line
} catch (e) {
  console.log('No application config could be found.', e);
}

module.exports = config;
