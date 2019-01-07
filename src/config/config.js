function isServer() {
  return !(typeof window !== 'undefined' && window.document);
}

let config = {};
try {
  const environment = process.env.REACT_APP_ENV;
  // const isServer = is_server();
  const domain = 'https://echaloasuerte.com';
  console.log(`Loading application config for environment: ${environment}`);
  config = Object.assign({}, { environment, domain, isServer: isServer() }, require(`./${environment}`).default);  // eslint-disable-line
} catch (e) {
  console.log('No application config could be found.', e);
}

module.exports = config;
