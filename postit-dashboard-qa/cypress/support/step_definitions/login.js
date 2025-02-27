import { When, Then, Given, DataTable } from "@badeball/cypress-cucumber-preprocessor"

Given("I am on the log in page", () => {
    cy.visit(Cypress.env("baseUrl"))
});