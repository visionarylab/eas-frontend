describe('Raffle Page', () => {
  ['macbook-13', 'iphone-5'].forEach(device => {
    context(`Device ${device}`, () => {
      beforeEach(() => {
        cy.server();
        cy.mockFixture('Raffle');
        cy.viewport(device);
      });

      describe('Creation page', () => {
        it('Full creation', () => {
          cy.mockGA();
          cy.visit('/raffle');

          cy.get('@ga')
            .should('be.calledWith', 'create', 'UA-XXXXX-Y')
            .and('be.calledWith', 'send', { hitType: 'pageview', page: '/raffle' });

          // Make required errors show up
          cy.getComponent('WizardForm__next-button').click();

          // It should error if participants is empty
          cy.getComponent('Raffle__prizes-field').shouldHaveError();
          cy.getComponent('Raffle__prizes-field-input').type('prize1, prize2,');
          cy.getComponent('Raffle__prizes-field').shouldNotHaveError();

          // It should error if prizes is empty
          cy.getComponent('Raffle__participants-field').shouldHaveError();
          cy.getComponent('Raffle__participants-field-input').type('one,');
          cy.getComponent('Raffle__participants-field').shouldNotHaveError();

          // It should error if there are less participants than prizes
          cy.getComponent('WizardForm__next-button').click();
          cy.getComponent('ErrorFeedback').should('be.visible');
          cy.getComponent('Raffle__participants-field-input').type('two,');
          cy.getComponent('ErrorFeedback').should('not.exist');

          // Go to second step
          cy.getComponent('WizardForm__next-button').click();

          // The title field should have a default value
          cy.getComponent('PublicDetails__title-field-input').should('not.have.value', '');

          // Attempt to submit step without filling the title
          cy.getComponent('PublicDetails__title-field-input').clear();
          cy.getComponent('WizardForm__next-button').click();

          // Title field should error as they are required
          cy.getComponent('PublicDetails__title-field').shouldHaveError();

          // Fill the title and its error should recover
          cy.getComponent('PublicDetails__title-field-input').type('The title');
          cy.getComponent('PublicDetails__title-field').shouldNotHaveError();

          // Fill the description
          cy.getComponent('PublicDetails__description-field-input').type('A cool description');

          // Go to third step
          cy.getComponent('WizardForm__next-button').click();

          // Submit the draw
          cy.getComponent('WizardForm__next-button').click();

          cy.mockedRequestWait('POST', '/api/raffle')
            .its('requestBody')
            .should('deep.eq', {
              description: 'A cool description',
              prizes: [{ name: 'prize1' }, { name: 'prize2' }],
              participants: [{ name: 'one' }, { name: 'two' }],
              title: 'The title',
            });

          cy.mockedRequestWait('POST', '/api/raffle/29080f6b-b3e4-412c-8008-7e26081ea17c/toss');
          cy.get('@ga').should('be.calledWith', 'send', {
            hitType: 'event',
            eventCategory: 'Raffle',
            eventAction: 'Publish',
            eventLabel: 'b29f44c2-1022-408a-925f-63e5f77a12ad',
          });

          // Redirect to draw with the public id
          cy.location('pathname').should('eq', '/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad');
        });

        it('Should show feedback if there are server errors', () => {
          cy.visit('/raffle');
          cy.route({
            method: 'POST',
            url: '/api/raffle/',
            status: 503,
            response: {},
          }).as('failedRequest');
          cy.getComponent('Raffle__prizes-field-input').type('prize1, prize2,');
          cy.getComponent('Raffle__participants-field-input').type('one, two,');
          cy.getComponent('WizardForm__next-button').click();
          cy.getComponent('WizardForm__next-button').click();
          cy.getComponent('WizardForm__next-button').click();
          cy.wait('@failedRequest');
          cy.getComponent('ErrorFeedback').should('be.visible');

          // It should recover form the error
          cy.mockFixture('Raffle'); // Reset the mock with the 200 response
          cy.getComponent('WizardForm__next-button').click();
          cy.getComponent('ErrorFeedback').should('not.exist');
        });
      });

      describe('Published page', () => {
        it('Should send GA pageview', () => {
          cy.mockGA();
          cy.visit('/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.get('@ga')
            .should('be.calledWith', 'create', 'UA-XXXXX-Y')
            .and('be.calledWith', 'send', {
              hitType: 'pageview',
              page: '/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad',
            });
        });

        it('Should show the countdown if there are not results', () => {
          const now = new Date();
          now.setHours(now.getHours() + 1);
          const dateInFuture = now.toISOString();
          cy.fixture('Raffle').then(fixtures => {
            const fixtureGetRaffle = fixtures.find(
              fixture => fixture.path === '/api/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad',
            );
            fixtureGetRaffle.response.results[0].schedule_date = dateInFuture;
            fixtureGetRaffle.response.results[0].value = null;
            cy.route(fixtureGetRaffle.method, fixtureGetRaffle.path, fixtureGetRaffle.response).as(
              'LoadData',
            );
          });
          cy.visit('/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.wait('@LoadData');
          cy.getComponent('Countdown').should('be.visible');
        });
        it('Should show results and the raffle details', () => {
          cy.visit('/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.mockedRequestWait('GET', '/api/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.getComponent('PublishedRafflePage__Title').contains('This is the title');
          cy.getComponent('WinnerChip').should('have.length', 1);

          // Non winners should not be shown
          cy.contains('Participant 1').should('not.exist');
        });
      });
    });
  });
});
