/* eslint-disable import/no-dynamic-require, global-require */

function getConfigurationByFile(file) {
  return require(`../../${file}`);
}

module.exports = (/* on */) => {
  const file = `cypress.${process.env.NODE_ENV || 'development'}.json`;
  const newConfig = getConfigurationByFile(file);
  return newConfig;
};
