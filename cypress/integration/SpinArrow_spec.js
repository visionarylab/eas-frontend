/* eslint-disable func-names, prefer-arrow-callback */

describe.skip('Spin Arrow Page', () => {
  it('Should send GA pageview', () => {
    cy.mockGA();
    cy.visit('/arrow');

    cy.get('@ga')
      .should('be.calledWith', 'create', 'UA-XXXXX-Y')
      .and('be.calledWith', 'send', { hitType: 'pageview', page: '/arrow' });
  });

  it('Should send GA event on toss', function() {
    cy.mockGA();
    cy.visit('/arrow');
    cy.getComponent('SpinArrow__arrow').click();
    cy.get('@ga').should('be.calledWith', 'send', {
      hitType: 'event',
      eventCategory: 'Toss',
      eventAction: 'Spin Arrow',
    });
  });

  it('Clicking the arrow should make it spin', function() {
    cy.visit('/arrow');
    cy.getComponent('SpinArrow__arrow').click();
    cy.getComponent('SpinArrow__arrow')
      .should('have.css', 'transform')
      .and('contain', 'matrix');
  });
});
