describe('Raffle Page', () => {
  describe('It should be possible to create a raffle', () => {
    it('asd', () => {
      cy.visit('/raffle');
      cy.getComponent('TitleInput').type('Action title');
      cy.getComponent('DescriptionInput').type('That is a cool description');
      cy.getComponent('ParticipantsInput').type('David, Mario, Cristina,');
      cy.getComponent('PrizeSelector__number-of-winners').type('2');
      cy.getComponent('WhenToToss__manual').check();
    });
  });
});
