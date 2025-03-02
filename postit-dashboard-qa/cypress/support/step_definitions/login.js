import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given("I am on the log in page", () => {
    cy.visit(Cypress.env("baseUrl"))
    cy.url().should("include", '/authent')

});

When("I fill in the log in form with the following credentials :", (credentialsTable) => {
  let credentials = credentialsTable.hashes();
    credentials.forEach(credential => {
        cy.get('[data-cy="auth-input-name"]').clear().type(credential.username)
        cy.get('[data-cy="auth-input-password"]').clear().type(credential.password)
    });
})

When("I click on the log in button", () => {
  cy.get('[data-cy="auth-submit-btn"]').click()
})

Then("I'm redirected to the home page", () => {
    cy.url().should("include", '/home')
})
