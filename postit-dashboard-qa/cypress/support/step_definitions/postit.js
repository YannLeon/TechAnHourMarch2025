import { When, Then } from "@badeball/cypress-cucumber-preprocessor"

Then('the {string} is displayed', (title) => {
    cy.get('.bg-white').find('h3').should('contain', title);
    cy.get('[data-cy="postit-input"]').should('have.attr', 'placeholder', 'Write your note...').and('is.visible');
    cy.get('[data-cy="add-postit-btn"]').should('contain', 'Add Post-it').and('is.visible');
});

When('I create new post it with the message {string}', (message) => {
    cy.get('[data-cy="postit-input"]').clear().type(message);
    cy.get('[data-cy="add-postit-btn"]').click()
});

Then('the post it number {int} appears', (postitID) => {
    cy.get(`[data-cy="postit-${postitID}"]`).should('be.visible')
})
