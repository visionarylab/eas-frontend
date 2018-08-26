/* eslint-disable func-names, prefer-arrow-callback */

// TODO Mock GA, Facebook

describe('Spin Arrow Page', () => {
  it('Clicking the arrow should make it spint', function() {
    cy.visit('/arrow');
    cy.getComponent('SpinArrow__arrow').click();
    // Check that it spins
  });
});
