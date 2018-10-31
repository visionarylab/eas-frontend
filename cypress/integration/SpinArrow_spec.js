/* eslint-disable func-names, prefer-arrow-callback */

describe('Spin Arrow Page', () => {
  it('Google Analytics pageview event is sent', () => {
    cy.mockGA();
    cy.visit('/arrow');

    cy.get('@ga')
      .should('be.calledWith', 'create', 'UA-XXXXX-Y')
      .and('be.calledWith', 'send', { hitType: 'pageview', page: '/arrow' });
  });

  it('Clicking the arrow should make it spin and send GA event', function() {
    cy.mockGA();
    cy.visit('/arrow');
    cy.getComponent('SpinArrow__arrow').click();
    cy.getComponent('SpinArrow__arrow')
      .should('have.css', 'transform')
      .and('contain', 'matrix');
    cy.get('@ga').should('be.calledWith', 'send', {
      hitType: 'event',
      eventCategory: 'Toss',
      eventAction: 'Spin Arrow',
    });
  });
});
