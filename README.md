[![Build Status](https://travis-ci.org/etcaterva/eas-frontend.svg?branch=master)](https://travis-ci.org/etcaterva/eas-frontend)

ÉchaloASuerte Frontend

## Working locally
### Set up local environment

```bash
# Set the environment to local
export REACT_APP_ENV=local

# Install the dependencies
npm install
```
Option 1  (recommended): Run the development server
```bash
npm run start:dev
```
Option 2: Start the server to do SSR
```bash
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
Integration tests are run with [Cypress.io](https://www.cypress.io/)
```bash
# It will fire the dev server in test mode and the Cypress UI
npm run test:integration
```

### Deploy to production
Master branch is deployed in https://beta-dev.echaloasuerte.com

```bash
# REACT_APP_ENV should be set to `production` or `development`
export REACT_APP_ENV=production

npm run install

# Generate the production bundle (REACT_APP_ENV needs to be set)
npm run build

# Start the server in SSR mode (REACT_APP_ENV needs to be set)
npm start
```
