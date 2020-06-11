describe('Spin Arrow Page', () => {
  ['macbook-13', 'iphone-5'].forEach(device => {
    context(`Device ${device}`, () => {
      beforeEach(() => {
        cy.server();
        cy.viewport(device);
      });

      it('Should have the correct OG tags on SSR', () => {
        cy.request('spinner')
          .its('body')
          .then(html => {
            expect(html).to.match(/<meta property="og:image".*arrow_og_image([^>]+)/);
            expect(html).to.match(/<meta property="og:title".*Girar una flecha([^>]+)/);
          });
      });

      it('Analytics pageview and event on toss', () => {
        cy.mockGA();
        cy.visit('/spinner');

        cy.get('@ga')
          .should('be.calledWith', 'create', 'UA-XXXXX-Y')
          .and('be.calledWith', 'send', { hitType: 'pageview', page: '/spinner' });

        cy.getComponent('SpinArrow__arrow').click();
        cy.get('@ga').should('be.calledWith', 'send', {
          hitType: 'event',
          eventCategory: 'Spin Arrow',
          eventAction: 'Toss',
        });
      });

      it('Clicking the arrow should make it spin', () => {
        cy.visit('/spinner');
        cy.getComponent('SpinArrow__arrow').click();
        cy.getComponent('SpinArrow__arrow')
          .should('have.css', 'transform')
          .and('contain', 'matrix');
      });
    });
  });
});
