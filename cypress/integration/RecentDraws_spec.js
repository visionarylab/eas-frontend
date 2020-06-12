describe('RecentRaffles', () => {
  beforeEach(() => {
    cy.server();
    const mockRecentDraws = [
      {
        id: '8f393558-320e-4603-ad4d-00000000000',
        title: 'A Raffle',
        url: '/groups/8f393558-320e-4603-ad4d-00000000000',
        scheduleDate: 1591526241,
      },
      {
        id: '8f393558-320e-4603-ad4d-0ef8b5395698',
        title: 'Sorteo de grupos aleatorios',
        url: '/groups/8f393558-320e-4603-ad4d-0ef8b5395698',
        scheduleDate: 1591520760,
      },
    ];
    window.localStorage.setItem('recentDraws', JSON.stringify(mockRecentDraws));
  });

  ['macbook-13'].forEach(device => {
    context(`Device ${device}`, () => {
      beforeEach(() => {
        cy.viewport(device);
      });

      it('Analytics events are sent on pageview', () => {
        cy.mockGA();
        cy.visit('/recent');

        cy.get('@ga')
          .should('be.calledWith', 'create', 'UA-XXXXX-Y')
          .and('be.calledWith', 'send', { hitType: 'pageview', page: '/recent' });
      });

      it('Should show the empty list if there are not recent raffles', () => {
        window.localStorage.removeItem('recentDraws');
        cy.visit('/recent');
        cy.findByText('No has realizado ningún sorteo público');
      });

      it('Should show all recent draws', () => {
        cy.visit('/recent');
        cy.findByRole('row', { name: /A Raffle June 7, 2020 12:37 PM/ });
        cy.findByRole('row', { name: /Sorteo de grupos aleatorios June 7, 2020 11:06 AM/ });
      });

      it('Recent raffles should have working links', () => {
        cy.visit('/recent');
        cy.findByRole('link', { name: 'A Raffle' }).click();
        cy.location('pathname').should('eq', '/groups/8f393558-320e-4603-ad4d-00000000000');
      });

      it('Should be possible to clear all recent draws', () => {
        cy.visit('/recent');
        cy.findByRole('row', { name: /A Raffle/ }).should('be.visible');
        cy.findByRole('button', { name: /Borrar tu historial/ }).click();
        cy.findByRole('button', { name: /Borrar historial/i }).click();
        cy.findByRole('row', { name: 'A Raffle' }).should('not.exist');
      });

      it('Should be possible to remove a single draw', () => {
        cy.visit('/recent');
        cy.findByRole('row', { name: /A Raffle/ }).within(() => {
          cy.findByRole('button', { name: 'Borrar sorteo de tu historial' }).click();
        });
        cy.findByRole('button', { name: /Borrar sorteo/i }).click();
        cy.findByRole('row', { name: 'A Raffle' }).should('not.exist');
      });
    });
  });
});
