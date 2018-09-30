[![Build Status](https://travis-ci.org/etcaterva/eas-frontend.svg?branch=master)](https://travis-ci.org/etcaterva/eas-frontend)

EAS Frontend

## Working locally
### Set up local environment

```bash
npm install
npm start
```

It requires the [eas-backend](https://github.com/etcaterva/eas-backend) to be deployed locally as well.

### Run linter

```bash
npm run lint
```

### Run tests

#### Unit tests
```bash
npm test
```

#### Integration tests
```bash
# First start the dev server with the test settings
npm run start:test

# Then run integration tests
npm run test:integration
```
Integration tests are run with [Cypress.io](https://www.cypress.io/)

### Generate production build
Generates a /build directory with React bundle in production mode, minified files and hashed filenames.

```bash
# Using production settings
npm run build
```
```bash
# Using development settings
npm run build:dev
```