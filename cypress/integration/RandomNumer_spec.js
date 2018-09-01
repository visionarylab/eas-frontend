/* eslint-disable func-names, prefer-arrow-callback */

// TODO Mock GA, Facebook

describe('Number Draw Page', () => {
  beforeEach(() => {
    cy.server();
    cy.mockFixture('RandomNumber');
  });

  it('Results are shown', function() {
    cy.visit('/number');
    cy.getComponent('SubmitDrawButton').click();
    cy.mockedRequestWait('POST', '/api/random_number');
    cy.mockedRequestWait('POST', '/api/random_number/6ce5042f-f931-4a79-a716-dfadccc978d0/toss');
    cy.getComponent('RandomNumber__result').should('be.visible');
  });

  it('Request sent contains the right data', function() {
    cy.visit('/number');
    cy.getComponent('RandomNumber__from-input')
      .clear()
      .type(3);
    cy.getComponent('RandomNumber__to-input')
      .clear()
      .type(100);
    cy.getComponent('RandomNumber__number-of-results-input')
      .clear()
      .type(1);
    cy.getComponent('SubmitDrawButton').click();

    cy.mockedRequestWait('POST', '/api/random_number')
      .its('requestBody')
      .should('deep.eq', {
        allow_repeated_results: false,
        description: 'Nice description',
        number_of_results: 1,
        range_max: 100,
        range_min: 3,
        title: 'Cool title',
      });
  });

  describe('Invalid configurations', function() {
    it('Should show error when any required field is empty', function() {
      cy.visit('/number');
      cy.getComponent('RandomNumber__from-field').within(() => {
        cy.getComponent('RandomNumber__from-input').clear();
        cy.getError().should('be.visible');
        cy.getComponent('RandomNumber__from-input').type(2);
        cy.getError().should('not.exist');
      });

      cy.getComponent('RandomNumber__to-field').within(() => {
        cy.getComponent('RandomNumber__to-input').clear();
        cy.getError().should('be.visible');
        cy.getComponent('RandomNumber__to-input').type(10);
        cy.getError().should('not.exist');
      });

      cy.getComponent('RandomNumber__number-of-results-field').within(() => {
        cy.getComponent('RandomNumber__number-of-results-input').clear();
        cy.getError().should('be.visible');
        cy.getComponent('RandomNumber__number-of-results-input').type(2);
        cy.getError().should('not.exist');
      });
    });

    it('Should show error when range is invalid', function() {
      cy.visit('/number');
      cy.getComponent('RandomNumber__from-input')
        .clear()
        .type(12);
      cy.getComponent('ValidationFeedback').should('be.visible');
    });

    it('Should show error when range is too small', function() {
      cy.visit('/number');
      cy.getComponent('RandomNumber__number-of-results-input')
        .clear()
        .type(12);
      cy.getComponent('ValidationFeedback').should('be.visible');
      cy.getComponent('RandomNumber__allow-repated-input').check();
      cy.getComponent('ValidationFeedback').should('not.exist');
    });
  });
});
