import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given('I am on the log in page', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.url().should('include', '/authent')

});

When('I fill in the form with the following credentials :', (credentialsTable) => {
    let credentials = credentialsTable.hashes();
    credentials.forEach(credential => {
        cy.get('[data-cy="auth-input-name"]').clear().type(credential.username)
        cy.get('[data-cy="auth-input-password"]').clear().type(credential.password)
    });
})

When('I click on the log in button', () => {
    cy.get('[data-cy="auth-submit-btn"]').click()
})

When('I click on the register button', () => {
    cy.get('[data-cy="auth-submit-btn"]').click()
})

When('I click on the log out button', () => {
    cy.get('[data-cy="logout-btn"]').click()
});

Then('I\'m redirected to the home page', () => {
    cy.url().should('include', '/home')
})

Then('I can see {int} post its', (nbOfPostIts) => {
    //to develop when ids are added
})

Then('the home page welcome message contains the user {string}', (username) => {
    cy.get('[data-cy="welcome-message"]').should('contain', `Welcome, ${username.toUpperCase()}`);
})
Then('the error message {string} appears in red', (errorMessage) => {
    cy.get('[data-cy="auth-error"]').should('contain', errorMessage).should('have.css', 'color', 'oklch(0.637 0.237 25.331)');
})

When('I click on register account', () => {
    cy.get('[data-cy="auth-toggle-btn"]').click();
})

Then('the {string} form is displayed', (formTitle) => {
    cy.get('.bg-white').find('h2').should('contain', formTitle);
    cy.get('[data-cy="auth-form"]').within(() => {
        cy.get('[data-cy="auth-input-name"]').should('have.attr', 'placeholder', 'Name').and('is.visible');
        cy.get('[data-cy="auth-input-password"]').should('have.attr', 'placeholder', 'Password').and('is.visible');
        cy.get('[data-cy="auth-submit-btn"]').should('contain', formTitle);
    });
    cy.get('[data-cy="auth-toggle-btn"]').should('contain', 'Already have an account? Login').and('is.visible');
});
