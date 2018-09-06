describe('Raffle', () => {
  describe('Creation page', () => {
    it.skip('It should be possible to create a raffle', () => {
      cy.visit('/raffle');
      // cy.getComponent('TitleInput').type('Action title');
      // cy.getComponent('DescriptionInput').type('That is a cool description');
      cy.getComponent('WizzardForm__next-button').click();
      cy.getComponent('MultiValueDisplay__chip')
        .first()
        .get('[class*="deleteIcon"]')
        .click();
      cy.getComponent('WizzardForm__next-button').click();

      //   cy.getComponent('MultiValueDisplay').within(() => {
      //     cy.get('[data-component="MultiValueDisplay__chip"]:contains("David")');
      //     cy.get('[data-component="MultiValueDisplay__chip"]:contains("Mario")');
      //     cy.get('[data-component="MultiValueDisplay__chip"]:contains("Cristina")')
      //       .find('svg')
      //       .click();
      //     cy.getComponent('MultiValueDisplay__chip')
      //       .contains('Cristina')
      //       .should('not.exist');
      //   });
      //   cy.getComponent('PrizeSelector__number-of-winners').type('2');
      //   cy.getComponent('WhenToToss__manual').check();
      //   cy.getComponent('SubmitDrawButton').click();
    });
  });
  describe('Published page', () => {
    it('Information about the raffle should be displayed', () => {
      // cy.visit('/raffle/123456');
      // cy.getComponent('PublishedRafflePage__Title').contains('Sorteo de Navidad');
    });
  });
});
