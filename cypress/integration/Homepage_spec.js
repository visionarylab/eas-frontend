describe('Homepage', () => {
  ['macbook-13' /* , 'iphone-5' */].forEach(device => {
    context(`Device ${device}`, () => {
      beforeEach(() => {
        cy.server();
        cy.viewport(device);
      });

      it('Should have the correct OG tags on SSR', () => {
        cy.request('/')
          .its('body')
          .then(html => {
            expect(html).to.match(/<meta property="og:image".*logo_og([^>]+)/);
            expect(html).to.match(
              /<meta property="og:title".*ÉchaloASuerte - Toma decisiones aleatoriamente([^>]+)/,
            );
            expect(html).to.match(
              /<link rel="alternate" hrefLang="en-GB" href="https:\/\/chooserandom.com"\/>/,
            );
            expect(html).to.match(
              /<link rel="alternate" hrefLang="es-ES" href="https:\/\/echaloasuerte.com"\/>/,
            );
            expect(html).to.match(/<link rel="canonical" href="https:\/\/echaloasuerte.com"\/>/);
          });
      });

      it('Should send GA pageview', () => {
        cy.mockGA();
        cy.visit('/');
        cy.get('@ga')
          .should('be.calledWith', 'create', 'UA-XXXXX-Y')
          .and('be.calledWith', 'send', { hitType: 'pageview', page: '/' });
      });
    });
  });
});
