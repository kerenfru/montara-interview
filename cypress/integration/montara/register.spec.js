context('Actions', () => {
    before(() => {
        cy.visit('http://localhost:8084/#/register')
    });

    it('Register successfully', () => {
        cy
            .get('#firstName').type('Robert').should('have.value', 'Robert')
            .get('#lastName').type('De Niro').should('have.value', 'De Niro')
            .get('#email').type('robertdeniro@test.com').should('have.value', 'robertdeniro@test.com')
            .get('#password').type('1234').should('have.value', '1234');

        cy.get('[data-cy=submit]').click();

        cy.get('[data-cy=greeting]')
            .should('contain', 'Hi Robert De Niro');
    });

    it('Entry and Exit', () => {
        cy.contains('Exit Entry').should('be.disabled');
        cy.contains('Log Entry').should('not.be.disabled');
        cy.contains('Log Entry').click();
        cy.contains('Exit Entry').should('not.be.disabled');
        cy.contains('Log Entry').should('be.disabled');
    })

    it('Health and Sickness validation', () => {
        cy
            .get('.cardsContainer').should('contain', 'Healthy')
            .get('.cardsContainer').should('contain', 'Free');
        cy.contains('I am Sick').click();

        cy
            .get('.cardsContainer').should('contain', 'Sick')
            .get('.cardsContainer').should('contain', 'In Quarantine');
    });
});
