// import config from './local';

const environment = process.env.NODE_ENV;

const config = require(`./${environment}`).default; // eslint-disable-line import/no-dynamic-require

config.environment = process.env.NODE_ENV;

export default config;
