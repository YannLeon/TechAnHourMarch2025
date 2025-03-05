import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given('I have a post it with the message {string} via API', (message) => {
    cy.request({
        method: 'POST',
        url: 'localhost:3000/postits',
        body: { "content": message, "user_id": "1" }
    })
})
