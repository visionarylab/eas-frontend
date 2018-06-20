/* eslint-disable func-names, prefer-arrow-callback */

// TODO Mock GA, Facebook

describe('Number Draw Page', () => {
  describe('It should be possible to generate random numbers ', function() {
    it('', function() {
      cy.visit('/number');
      cy.getComponent('SubmitDrawButton').should('be.visible');
    });
  });
});
