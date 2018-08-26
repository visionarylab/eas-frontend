/* eslint-disable func-names, prefer-arrow-callback */

// TODO Mock GA, Facebook

describe('Number Draw Page', () => {
  describe('It should be possible to generate random numbers ', function() {
    it('', function() {
      cy.server();
      cy.fixture('RandomNumber').then(json => {
        const createRequest = json.find(
          fixtureRequest =>
            fixtureRequest.method === 'POST' && fixtureRequest.path === '/api/random_number',
        );
        const tossRequest = json.find(
          fixtureRequest =>
            fixtureRequest.method === 'POST' &&
            fixtureRequest.path === '/api/random_number/6ce5042f-f931-4a79-a716-dfadccc978d0/toss',
        );
        cy.route('POST', '/api/random_number', createRequest.response).as('Create');
        cy.route(
          'POST',
          '/api/random_number/6ce5042f-f931-4a79-a716-dfadccc978d0/toss',
          tossRequest.response,
        ).as('Toss');
      });
      // cy.route({
      //   method: 'POST',
      //   url: '/api/random_number',
      //   status: 200,
      //   response: {
      //     action_id: 1,
      //     message: 'action created',
      //     status: 200,
      //   },
      // }).as('addAction');
      cy.visit('/number');
      cy.getComponent('SubmitDrawButton').click();
      cy.wait('@Create');
      cy.wait('@Toss');
      cy.getComponent('RandomNumber__result').should('be.visible');
    });
  });
});
