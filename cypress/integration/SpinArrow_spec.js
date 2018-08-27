/* eslint-disable func-names, prefer-arrow-callback */

describe('Spin Arrow Page', () => {
  it.only('Clicking the arrow should make it spin', function() {
    cy.visit('/arrow');
    cy.getComponent('SpinArrow__arrow').click();
    cy.getComponent('SpinArrow__arrow')
      .should('have.css', 'transform')
      .and('contain', 'matrix');
  });
});
