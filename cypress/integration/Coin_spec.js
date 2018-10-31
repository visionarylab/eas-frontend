describe.only('Coin', () => {
  it('Google Analytics pageview event is sent', () => {
    cy.mockGA();
    cy.visit('/flip-a-coin');

    cy.get('@ga')
      .should('be.calledWith', 'create', 'UA-XXXXX-Y')
      .and('be.calledWith', 'send', { hitType: 'pageview', page: '/flip-a-coin' });
  });

  it('Clicking the coin should make it spin and send GA event', () => {
    cy.mockGA();
    cy.visit('/flip-a-coin');
    cy.get('[class*="FlipCoinPage__coin--"]').should('not.exist');
    cy.getComponent('FlipCoinPage__coin').click();
    cy.get('[class*="FlipCoinPage__coin--"]').should('exist');

    cy.get('@ga').should('be.calledWith', 'send', {
      hitType: 'event',
      eventCategory: 'Toss',
      eventAction: 'Coin',
    });
  });
});
