describe('FacebookRaffle', () => {
  ['macbook-13' /* 'iphone-5' */].forEach(device => {
    context(`Device ${device}`, () => {
      beforeEach(() => {
        cy.server();
        cy.mockFixture('FacebookRaffle');
        cy.mockGA();
        cy.viewport(device);
      });

      describe('Public Draw', () => {
        describe.only('Analytics', () => {
          it('Events sent on pageview', () => {
            cy.visit('/facebook');

            cy.get('@ga')
              .should('be.calledWith', 'create', 'UA-XXXXX-Y')
              .and('be.calledWith', 'send', { hitType: 'pageview', page: '/facebook' });
          });

          it('Events sent on publish', () => {
            cy.visit('/facebook');
            cy.getComponent('FacebookRaffle__prizes-field-input').type('prize1, prize2');
            cy.getComponent('WizardForm__next-button').click();
            cy.getComponent('WizardForm__next-button').click();
            cy.getComponent('WizardForm__next-button').click();
            cy.get('@ga').should('be.calledWith', 'send', {
              hitType: 'event',
              eventCategory: 'Facebook',
              eventAction: 'Publish',
              eventLabel: 'b29f44c2-1022-408a-925f-63e5f77a12ad',
            });
          });
        });

        it('Create', () => {
          cy.mockGA();
          cy.visit('/raffle/public');

          cy.get('@ga')
            .should('be.calledWith', 'create', 'UA-XXXXX-Y')
            .and('be.calledWith', 'send', { hitType: 'pageview', page: '/raffle/public' });

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
          cy.visit('/raffle/public');
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
        it('Analytics events sent on pageview', () => {
          cy.visit('/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad');

          cy.get('@ga')
            .should('be.calledWith', 'create', 'UA-XXXXX-Y')
            .and('be.calledWith', 'send', {
              hitType: 'pageview',
              page: '/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad',
            });
        });

        it('Should show the countdown if there are not results', () => {
          // cy.mockFB();
          // cy.window().then(win => {
          //   // eslint-disable-next-line no-param-reassign
          //   win.FB.api = cy
          //     .spy((endpoint, options, callback) => {
          //       callback({ id: '000000', name: 'Mr Nobody' });
          //     })
          //     .as('FbApi');
          // });
          // cy.wait('@LoadData').then(() =>
          //   cy.window().then(win => {
          //     win.cypressEas.statusChange({ authResponse: true });
          //   }),
          // );
          cy.clock(new Date().getTime());
          const missingSeconds = 2;

          cy.fixture('FacebookRaffle').then(fixtures => {
            const now = new Date();
            now.setSeconds(now.getSeconds() + missingSeconds);
            const dateInFuture = now.toISOString();
            const fixtureGetDraw = fixtures.find(
              fixture => fixture.path === '/api/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad',
            );
            fixtureGetDraw.response.results[0].schedule_date = dateInFuture;
            fixtureGetDraw.response.results[0].value = null;
            cy.route(fixtureGetDraw.method, fixtureGetDraw.path, fixtureGetDraw.response).as(
              'LoadDataResultsPending',
            );
          });
          cy.visit('/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.wait('@LoadDataResultsPending');
          cy.getComponent('Countdown').should('be.visible');
          cy.fixture('FacebookRaffle').then(fixtures => {
            const fixtureGetDraw = fixtures.find(
              fixture => fixture.path === '/api/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad',
            );
            cy.route(fixtureGetDraw.method, fixtureGetDraw.path, fixtureGetDraw.response).as(
              'LoadDataResultsPublished',
            );
          });
          cy.tick((missingSeconds + 1) * 1000); // Fast forward the countdown

          // Once the countdown is over, the the api should be called again
          cy.wait('@LoadDataResultsPublished');
        });

        it('Should show results and the groups draw details', () => {
          cy.visit('/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.mockedRequestWait('GET', '/api/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.getComponent('DrawHeading__title').contains('Sorteo de grupos aleatorios');
          cy.getComponent('GroupsGeneratorResult__group').should('have.length', 2);
          cy.getComponent('GroupsGeneratorResult__group')
            .eq(0)
            .contains('participant2');
          cy.getComponent('GroupsGeneratorResult__group')
            .eq(1)
            .contains('participant1');
        });

        it('Should show share buttons', () => {
          cy.mockWindowOpen();
          cy.visit('/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.getComponent('SocialButton__whatsapp').click();
          cy.get('@ga').and('be.calledWith', 'send', {
            hitType: 'event',
            eventCategory: 'Groups',
            eventAction: 'Social Share Draw',
            eventLabel: 'whatsapp',
          });
          cy.get('@winOpen').and('be.calledOnce');
        });

        it.only('full stuff', () => {
          cy.mockFB();

          // Mocking a draw in the future
          const now = new Date();
          now.setHours(now.getHours() + 1);
          const dateInFuture = now.toISOString();
          cy.fixture('FacebookRaffle').then(fixtures => {
            const fixtureGetRaffle = fixtures.find(
              fixture => fixture.path === '/api/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad',
            );
            fixtureGetRaffle.response.results[0].schedule_date = dateInFuture;
            fixtureGetRaffle.response.results[0].value = null;
            cy.route(fixtureGetRaffle.method, fixtureGetRaffle.path, fixtureGetRaffle.response).as(
              'LoadData',
            );
          });

          cy.visit('/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.window().then(win => {
            // eslint-disable-next-line no-param-reassign
            win.FB.api = cy
              .spy((endpoint, options, callback) => {
                callback({ id: '000000', name: 'Mr Nobody' });
              })
              .as('FbApi');
          });

          // Status change will be automatically called after FB has been initialised
          cy.get('@FbLogin')
            .should('be.calledOnce')
            .then(() =>
              cy.window().then(win => {
                win.cypressEas.statusChange({ authResponse: true });
              }),
            );
          cy.get('@FbApi').should('be.calledWith', '/me', {});
          cy.getComponent('FacebookRaffle__participat-registered').should('contain', 'Mr Nobody');
        });
      });
    });
    //   });
    // });
    //   beforeEach(() => {
    //     cy.server();
    //     cy.mockFixture('FacebookRaffle');
    //   });

    //   describe('Creation page', () => {
    //     it('Google Analytics pageview event is sent', () => {
    //       cy.mockGA();
    //       cy.visit('/facebook');

    //       cy.get('@ga')
    //         .should('be.calledWith', 'create', 'UA-XXXXX-Y')
    //         .and('be.calledWith', 'send', { hitType: 'pageview', page: '/facebook' });
    //     });

    //     it('It should be possible to create a raffle', () => {
    //       cy.mockGA();
    //       cy.visit('/facebook');

    //       // Attempt to submit step without inputting any prize should show error
    //       cy.getComponent('WizardForm__next-button').click();
    //       cy.getComponent('Raffle__prizes-field').within(() => {
    //         cy.getError().should('be.visible');
    //       });

    //       cy.getComponent('Raffle__prizes-field-input').type('Prize 1,');

    //       // Go to General Details step
    //       cy.getComponent('WizardForm__next-button').click();
    //       // Trying to leave the title empry should error
    //       cy.getComponent('PublicDetails__title-field-input').clear();
    //       cy.getComponent('WizardForm__next-button').click();
    //       cy.getComponent('PublicDetails__title-field').within(() => {
    //         cy.getError().should('be.visible');
    //       });

    //       // Fill the title and its error should recover
    //       cy.getComponent('PublicDetails__title-field-input')
    //         .clear()
    //         .type('The title');
    //       cy.getComponent('PublicDetails__title-field').within(() => {
    //         cy.getError().should('not.exist');
    //       });

    //       // Fill the description
    //       cy.getComponent('PublicDetails__description-field-input')
    //         .clear()
    //         .type('A cool description');
    //       cy.getComponent('PublicDetails__description-field').within(() => {
    //         cy.getError().should('not.exist');
    //       });

    //       // Go to "Select date" step
    //       cy.getComponent('WizardForm__next-button').click();

    //       // Submit form
    //       cy.getComponent('WizardForm__next-button').click();
    //       cy.get('@ga').should('be.calledWith', 'send', {
    //         hitType: 'event',
    //         eventCategory: 'Facebook',
    //         eventAction: 'Publish',
    //         eventLabel: 'b29f44c2-1022-408a-925f-63e5f77a12ad',
    //       });

    //       cy.mockedRequestWait('POST', '/api/raffle')
    //         .its('requestBody')
    //         .should('deep.eq', {
    //           title: 'The title',
    //           description: 'A cool description',
    //           participants: [{ name: 'participant1', facebook_id: '000000' }],
    //           prizes: [{ name: 'Prize 1' }],
    //         });
    //       cy.mockedRequestWait('POST', '/api/raffle/29080f6b-b3e4-412c-8008-7e26081ea17c/toss');
    //       cy.get('@ga').should('be.calledWith', 'send', {
    //         hitType: 'event',
    //         eventCategory: 'Facebook',
    //         eventAction: 'Publish',
    //         eventLabel: 'b29f44c2-1022-408a-925f-63e5f77a12ad',
    //       });
    //       cy.location('pathname').should('eq', '/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad');
    //     });
    //   });
    describe('Published Facebook Raffle', () => {
      describe('Before results published', () => {
        beforeEach(() => {
          cy.mockFB();

          // Mocking a draw in the future
          const now = new Date();
          now.setHours(now.getHours() + 1);
          const dateInFuture = now.toISOString();
          cy.fixture('FacebookRaffle').then(fixtures => {
            const fixtureGetRaffle = fixtures.find(
              fixture => fixture.path === '/api/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad',
            );
            fixtureGetRaffle.response.results[0].schedule_date = dateInFuture;
            fixtureGetRaffle.response.results[0].value = null;
            cy.route(fixtureGetRaffle.method, fixtureGetRaffle.path, fixtureGetRaffle.response).as(
              'LoadData',
            );
          });
        });
        it('Should initially state if the user is regitered', () => {
          cy.visit('/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.window().then(win => {
            // eslint-disable-next-line no-param-reassign
            win.FB.api = cy
              .spy((endpoint, options, callback) => {
                callback({ id: '000000', name: 'Mr Nobody' });
              })
              .as('FbApi');
          });

          // Status change will be automatically called after FB has been initialised
          cy.wait('@LoadData').then(() =>
            cy.window().then(win => {
              win.cypressEas.statusChange({ authResponse: true });
            }),
          );
          cy.get('@FbApi').should('be.calledWith', '/me', {});
          cy.getComponent('FacebookRaffle__participat-registered').should('contain', 'Mr Nobody');
        });
        it('Should show the countdown if there are not results yet', () => {
          cy.visit('/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad');
          cy.window().then(win => {
            // eslint-disable-next-line no-param-reassign
            win.FB.api = cy
              .spy((endpoint, options, callback) => {
                callback({ id: '000000', name: 'Mr Nobody' });
              })
              .as('FbApi');
          });
          cy.wait('@LoadData');
          cy.getComponent('Countdown').should('be.visible');

          // Do facebook login
          cy.getComponent('FacebookLoginButton').click();
          cy.get('@FbLogin')
            .should('be.calledOnce')
            .then(() =>
              cy.window().then(win => {
                win.cypressEas.statusChange({ authResponse: true });
              }),
            );
          cy.get('@FbApi').should('be.calledWith', '/me', {});
          cy.getComponent('FacebookRaffle__participat-button').should('contain', 'Mr Nobody');

          // Register in the raffle
          cy.getComponent('FacebookRaffle__participat-button').click();
          cy.mockedRequestWait(
            'POST',
            '/api/raffle/b29f44c2-1022-408a-925f-63e5f77a12ad/participants',
          )
            .its('requestBody')
            .should('deep.eq', { facebook_id: '000000', name: 'Mr Nobody' });
          cy.getComponent('FacebookRaffle__participat-registered').should('contain', 'Mr Nobody');
        });
      });

      describe('After results published', () => {
        it('Should show the results', () => {
          cy.visit('/facebook/b29f44c2-1022-408a-925f-63e5f77a12ad');
        });
      });

      // it('Should show results and the raffle details', () => {
      //   cy.visit('/raffle/29080f6b-b3e4-412c-8008-7e26081ea17c');
      //   cy.mockedRequestWait('GET', '/api/raffle/29080f6b-b3e4-412c-8008-7e26081ea17c');
      //   cy.getComponent('PublishedRafflePage__Title').contains('This is the title');
      //   cy.getComponent('WinnerChip').should('have.length', 1);

      //   // Non winners should not be shown
      //   cy.contains('Participant 1').should('not.exist');
      // });
    });
  });
});
