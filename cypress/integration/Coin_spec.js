describe('Coin', () => {
  it('Should send GA pageview', () => {
    cy.mockGA();
    cy.visit('/flip-a-coin');
    cy.get('@ga')
      .should('be.calledWith', 'create', 'UA-XXXXX-Y')
      .and('be.calledWith', 'send', { hitType: 'pageview', page: '/flip-a-coin' });
  });

  it('Should send GA event on toss', () => {
    cy.mockGA();
    cy.visit('/flip-a-coin');
    cy.getComponent('FlipCoinPage__coin').click();
    cy.get('@ga').should('be.calledWith', 'send', {
      hitType: 'event',
      eventCategory: 'Toss',
      eventAction: 'Coin',
    });
  });

  it('Clicking the coin should make it spin', () => {
    cy.visit('/flip-a-coin');
    cy.get('[class*="FlipCoinPage__coin--"]').should('not.exist');
    cy.getComponent('FlipCoinPage__coin').click();
    cy.get('[class*="FlipCoinPage__coin--"]').should('exist');
  });
});
