/**
 * When running the integration tests with Cypress we need to mock the calls
 * done from the server (when doing SSR).
 */
const nock = require('nock');
const groupsJson = require('./fixtures/GroupsGenerator.json');
const raffleJson = require('./fixtures/Raffle.json');
const facebookJson = require('./fixtures/FacebookRaffle.json');
const numberJson = require('./fixtures/RandomNumber.json');

function mockServerCalls() {
  const fixturesSets = [groupsJson, raffleJson, facebookJson, numberJson];
  let fixtures = fixturesSets.map(fixturesSet =>
    fixturesSet.filter(fixture => fixture.method === 'GET'),
  );

  // Flatten the array
  fixtures = [].concat(...fixtures);

  fixtures.forEach(fixture => {
    const { response, method, path } = fixture;
    nock('http://127.0.0.1:8000').persist().intercept(path, method).reply(200, response);
  });
}

module.exports = mockServerCalls;
