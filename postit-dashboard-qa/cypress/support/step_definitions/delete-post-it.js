import { Given, When, Before } from "@badeball/cypress-cucumber-preprocessor"

When('I delete post it with the message {string}', (message) => {
    cy.get('[data-cy="postit-content"]').contains(message).parent().within(() => {
        cy.get('[data-cy="postit-delete"]').click()
    })
    cy.wait(500)
})
